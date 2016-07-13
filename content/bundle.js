'use strict';

{
  var config = function config($urlRouterProvider, httpMethodInterceptorProvider) {
    $urlRouterProvider.otherwise('/notes/');
    httpMethodInterceptorProvider.whitelistDomain('localhost');
  };

  var run = function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.$state = $state;
    });
  };

  angular.module('meganote', ['ui.router', 'ngFlash', 'textAngular', 'ng.httpLoader', 'meganote.notes', 'meganote.notesForm', 'meganote.signUp', 'meganote.signIn', 'meganote.users']).config(config).run(run);

  config.$inject = ['$urlRouterProvider', 'httpMethodInterceptorProvider'];


  run.$inject = ['$rootScope', '$state'];
}
'use strict';

{
  angular.module('meganote.notesForm', []);
}
'use strict';

{
  angular.module('meganote.notes', []);
}
'use strict';

{
  angular.module('meganote.signIn', []);
}
'use strict';

{
  angular.module('meganote.signUp', []);
}
'use strict';

{
  angular.module('meganote.users', []);
}
'use strict';

{
  angular.module('meganote').constant('API_BASE', 'http://localhost:3030/api/v1/');
}
'use strict';

{
  var AuthInterceptor = function AuthInterceptor(AuthToken, API_BASE) {
    return {
      request: function request(req) {
        var token = AuthToken.get();
        if (token && req.url.includes(API_BASE)) {
          req.headers.Authorization = token;
        }
        return req;
      }
    };
  };

  var authConfig = function authConfig($httpProvider) {
    return $httpProvider.interceptors.push('AuthInterceptor');
  };

  angular.module('meganote').factory('AuthInterceptor', AuthInterceptor).config(authConfig);

  AuthInterceptor.$inject = ['AuthToken', 'API_BASE'];


  authConfig.$inject = ['$httpProvider'];
}
'use strict';

{
  var NotesFormController = function NotesFormController($state, Flash, NotesService) {
    var vm = this;
    vm.note = NotesService.find($state.params.noteId);
    vm.clearForm = clearForm;
    vm.save = save;
    vm.destroy = destroy;

    /////////////////

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
      if (vm.note._id) {
        NotesService.update(vm.note).then(function (res) {
          vm.note = angular.copy(res.data.note);
          Flash.create('success', res.data.message);
        }, function () {
          return Flash.create('danger', 'Oops! Something went wrong.');
        });
      } else {
        NotesService.create(vm.note).then(function (res) {
          vm.note = res.data.note;
          Flash.create('success', res.data.message);
          $state.go('notes.form', { noteId: vm.note._id });
        }, function () {
          return Flash.create('danger', 'Oops! Something went wrong.');
        });
      }
    }

    function destroy() {
      NotesService.destroy(vm.note).then(function () {
        return $state.go('notes.form', { noteId: undefined });
      });
    }
  };

  angular.module('meganote.notesForm').controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'Flash', 'NotesService'];
}
'use strict';

{
  var NotesController = function NotesController($scope, NotesService) {
    var vm = this;
    vm.notes = NotesService.notes;
  };

  angular.module('meganote.notes').controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
}
'use strict';

{
  var NotesService = function NotesService($http, API_BASE) {
    var apiURI = API_BASE + 'notes/';

    var service = {
      notes: [],
      getNotes: getNotes,
      create: create,
      update: update,
      destroy: destroy,
      removeById: removeById,
      find: find
    };

    return service;

    //////////////////////

    function getNotes() {
      var notesPromise = $http.get(apiURI);

      notesPromise.then(function (res) {
        return service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post(apiURI, {
        note: note
      });

      notesPromise.then(function (res) {
        return service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      var notesPromise = $http.put('' + apiURI + note._id, {
        note: note
      });

      notesPromise.then(function (res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function destroy(note) {
      var notesPromise = $http.delete('' + apiURI + note._id);

      notesPromise.then(function (res) {
        return service.removeById(res.data.note._id);
      });

      return notesPromise;
    }

    function removeById(id) {
      for (var i = 0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    }

    function find(id) {
      for (var i = 0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return angular.copy(service.notes[i]);
        }
      }
    }
  };

  angular.module('meganote.notes').factory('NotesService', NotesService);

  NotesService.$inject = ['$http', 'API_BASE'];
}
'use strict';

{
  (function () {
    var notesConfig = function notesConfig($stateProvider) {
      $stateProvider.state('notes', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          notesLoaded: notesLoaded
        },
        data: {
          title: 'Notes'
        }
      }).state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form/notes-form.html',
        controller: 'NotesFormController',
        controllerAs: 'vm',
        data: {
          title: 'Notes'
        },
        onExit: ['Flash', function (Flash) {
          Flash.clear();
        }]
      });
    };

    var notesLoaded = function notesLoaded(NotesService) {
      return NotesService.getNotes();
    };

    angular.module('meganote.notes').config(notesConfig);

    notesConfig.$inject = ['$stateProvider'];


    notesLoaded.$inject = ['NotesService'];
  })();
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.signIn').directive('signIn', ['$state', 'UsersService', function ($state, UsersService) {
    var SignInController = function () {
      function SignInController() {
        _classCallCheck(this, SignInController);
      }

      _createClass(SignInController, [{
        key: 'submit',
        value: function submit() {
          var vm = this;
          UsersService.login(vm.user).then(function () {
            return $state.go('notes.form', { noteId: undefined });
          });
        }
      }]);

      return SignInController;
    }();

    return {
      scope: {},
      controller: SignInController,
      controllerAs: 'vm',
      bindToController: true,
      template: '\n\n          <div class="container">\n            <div class="row">\n              <div class="col-xs-6 col-xs-offset-4">\n                <h3>Welcome back!</h3>\n                <form id="new_user" ng-submit="vm.submit()">\n                  <p>\n                    <label for="username">Username</label><br>\n                    <input\n                      type="text"\n                      name="username"\n                      ng-model="vm.user.username"\n                      required>\n                  </p>\n                  <p>\n                    <label for="password">Password</label><br>\n                    <input\n                      type="password"\n                      name="password"\n                      ng-model="vm.user.password"\n                      required>\n                  </p>\n                  <input type="submit" name="commit" value="Sign In" class="btn btn-default">\n                  <span class="login">\n                    Don\'t have an account?\n                    <a ui-sref="sign-up">Sign up!</a>\n                  </span>\n                </form>\n              </div>\n            </div>\n          </div>\n\n          '
    };
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.signUp').directive('signUp', ['$state', 'Flash', 'UsersService', function ($state, Flash, UsersService) {

    var flash = false;

    var SignUpController = function () {
      function SignUpController() {
        _classCallCheck(this, SignUpController);

        this.user = {};
      }

      _createClass(SignUpController, [{
        key: 'submit',
        value: function submit() {
          if (Number.isInteger(flash)) {
            Flash.dismiss(flash);
            flash = false;
          }
          UsersService.create(this.user).then(function () {
            return $state.go('notes.form', { noteId: undefined });
          }, function (res) {
            var errors = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = res.data.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var error = _step.value;

                errors += '<li>' + error + '</li>';
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            flash = Flash.create('danger', '\n                    <p>Oops! Something went wrong.</p>\n                    <ul>' + errors + '</ul>\n                  ');
          });
        }
      }]);

      return SignUpController;
    }();

    return {
      scope: {},
      controller: SignUpController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'sign-up/sign-up.html'
    };
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').service('AuthToken', ['$window', function ($window) {
    var AuthToken = function () {
      function AuthToken() {
        _classCallCheck(this, AuthToken);

        this.token = $window.localStorage.getItem('authToken');
      }

      _createClass(AuthToken, [{
        key: 'set',
        value: function set(token) {
          this.token = token;
          $window.localStorage.setItem('authToken', this.token);
        }
      }, {
        key: 'get',
        value: function get() {
          return this.token;
        }
      }, {
        key: 'clear',
        value: function clear() {
          this.token = undefined;
          $window.localStorage.removeItem('authToken');
        }
      }]);

      return AuthToken;
    }();

    return new AuthToken();
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').service('CurrentUser', ['$window', function ($window) {
    var CurrentUser = function () {
      function CurrentUser() {
        _classCallCheck(this, CurrentUser);

        this.user = JSON.parse($window.localStorage.getItem('currentUser'));
      }

      _createClass(CurrentUser, [{
        key: 'set',
        value: function set(user) {
          this.user = user;
          $window.localStorage.setItem('currentUser', JSON.stringify(this.user));
        }
      }, {
        key: 'get',
        value: function get() {
          return this.user || {};
        }
      }, {
        key: 'clear',
        value: function clear() {
          this.user = undefined;
          $window.localStorage.removeItem('currentUser');
        }
      }, {
        key: 'signedIn',
        value: function signedIn() {
          return !!this.get()._id;
        }
      }]);

      return CurrentUser;
    }();

    return new CurrentUser();
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').directive('userProfile', ['CurrentUser', 'UsersService', function (CurrentUser, UsersService) {
    var UserProfileController = function () {
      function UserProfileController() {
        _classCallCheck(this, UserProfileController);

        var vm = this;
        vm.user = angular.copy(CurrentUser.get());
      }

      _createClass(UserProfileController, [{
        key: 'submit',
        value: function submit() {
          var vm = this;
          UsersService.update(vm.user);
        }
      }]);

      return UserProfileController;
    }();

    return {
      scope: {},
      controller: UserProfileController,
      controllerAs: 'vm',
      bindToController: true,
      template: '\n\n          <div class="container">\n            <div class="row">\n              <div class="col-xs-6 col-xs-offset-4">\n                <h3>Update Your Profile</h3>\n                <form id="new_user" ng-submit="vm.submit()">\n                  <p>\n                    <label for="name">Full Name</label><br>\n                    <input\n                      type="text"\n                      name="name"\n                      autofocus="autofocus"\n                      ng-model="vm.user.name"\n                      required>\n                  </p>\n                  <p>\n                    <label for="username">Username</label><br>\n                    <input\n                      type="text"\n                      name="username"\n                      ng-model="vm.user.username"\n                      required>\n                  </p>\n                  <input type="submit" name="commit" value="Save Changes" class="btn btn-default">\n                  <span class="login">\n                    <a ui-sref="notes.form({ noteId: undefined })">\n                      Back to my notes\n                    </a>\n                  </span>\n                </form>\n              </div>\n            </div>\n          </div>\n\n\n          '
    };
  }]);
}
'use strict';

{
  var usersConfig = function usersConfig($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>',
      data: {
        title: 'Sign Up'
      },
      onExit: ['Flash', function (Flash) {
        Flash.clear();
      }]
    }).state('sign-in', {
      url: '/sign-in',
      template: '<sign-in></sign-in>',
      data: {
        title: 'Sign In'
      }
    }).state('user-profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
      data: {
        title: 'Profile'
      }
    });
  };

  angular.module('meganote.users').config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').directive('userLinks', ['AuthToken', 'CurrentUser', function (AuthToken, CurrentUser) {
    var UserLinksController = function () {
      function UserLinksController() {
        _classCallCheck(this, UserLinksController);
      }

      _createClass(UserLinksController, [{
        key: 'user',
        value: function user() {
          return CurrentUser.get();
        }
      }, {
        key: 'signedIn',
        value: function signedIn() {
          return CurrentUser.signedIn();
        }
      }, {
        key: 'logout',
        value: function logout() {
          CurrentUser.clear();
          AuthToken.clear();
        }
      }]);

      return UserLinksController;
    }();

    return {
      scope: {},
      controller: UserLinksController,
      controllerAs: 'vm',
      bindToController: true,
      template: '\n\n          <div class="user-links">\n            <span ng-show="vm.signedIn()">\n              <a ui-sref="user-profile">Signed in as {{ vm.user().name }}</a>\n              |\n              <a ui-sref="sign-up" ng-click="vm.logout()">Logout</a>\n            </span>\n            <span ng-show="!vm.signedIn()">\n              <a ui-sref="sign-up">Sign up for Meganote today!</a>\n            </span>\n          </div>\n\n          '
    };
  }]);
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  angular.module('meganote.users').service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', function ($http, API_BASE, AuthToken, CurrentUser) {

    var apiURI = API_BASE + 'users/';

    var UsersService = function () {
      function UsersService() {
        _classCallCheck(this, UsersService);
      }

      _createClass(UsersService, [{
        key: 'create',


        // Sign Up
        value: function create(user) {
          return $http.post(apiURI, {
            user: user
          }).then(function (res) {
            AuthToken.set(res.data.authToken);
            CurrentUser.set(res.data.user);
          });
        }

        // Update profile

      }, {
        key: 'update',
        value: function update(user) {
          return $http.put('' + apiURI + user._id, {
            user: user
          }).then(function (res) {
            return CurrentUser.set(res.data.user);
          });
        }

        // Sign In

      }, {
        key: 'login',
        value: function login(user) {
          return $http.post(API_BASE + 'sessions', {
            user: user
          }).then(function (res) {
            AuthToken.set(res.data.authToken);
            CurrentUser.set(res.data.user);
          });
        }
      }]);

      return UsersService;
    }();

    return new UsersService();
  }]);
}
//# sourceMappingURL=bundle.js.map
