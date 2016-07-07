'use strict';

{
  var config = function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  };

  angular.module('meganote', ['ui.router', 'ngFlash', 'textAngular', 'meganote.notes', 'meganote.notesForm', 'meganote.noteConst']).config(config);

  config.$inject = ['$urlRouterProvider'];
}
'use strict';

(function () {
  'use strict';

  angular.module('meganote.notes', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.notesForm', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.signUp', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.noteConst', []).factory('noteConstants', noteConstants);

  function noteConstants() {
    var service = {
      apiUrl: 'http://localhost:3030/'
    };
    return service;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.notes').factory('flashService', flashService);

  flashService.$inject = ['Flash'];
  function flashService(Flash) {
    var service = {
      success: success,
      fail: fail
    };
    return service;
    ////////////////////////functions below///////////////
    function success(message) {
      Flash.create('success', message); //MIGRATE FLASH STUFF TO SERVICE
    }
    function fail() {
      Flash.create('danger', ' Oops! Something went wrong.'); //MIGRATE FLASH STUFF TO SERVICE
    }
  }
})();
'use strict';

(function () {
  angular.module('meganote.notes').controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController(NotesService) {
    var vm = this;
    vm.notes = NotesService.notes;
  }
})();
'use strict';

(function () {
  angular.module('meganote.notes').factory('NotesService', NotesService);

  NotesService.$inject = ['$http', 'noteConstants'];
  function NotesService($http, noteConstants) {
    //  var notes = [];
    var service = {
      getNotes: getNotes,
      create: create,
      update: update,
      delete: deleteNote,
      removeById: removeById,
      find: find,
      notes: []
    };
    /////////////////////////////////////////////////
    function getNotes() {
      var notesPromise = $http.get(noteConstants.apiUrl);

      notesPromise.then(function (res) {
        service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post(noteConstants.apiUrl, {
        note: note
      });

      notesPromise.then(function (res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      var notesPromise = $http.put(noteConstants.apiUrl + note._id, {
        note: note
      });

      notesPromise.then(function (res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function deleteNote(note) {
      var notesPromise = $http.delete(noteConstants.apiUrl + note._id);

      notesPromise.then(function (res) {
        service.removeById(res.data.note._id);
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
  }
})();
'use strict';

(function () {
  angular.module('meganote.notesForm').controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'flashService', 'NotesService'];
  function NotesFormController($state, flashService, NotesService) {
    var vm = this;
    vm.clearForm = clearForm;
    vm.save = save;
    vm.delete = deleteNote;
    vm.note = NotesService.find($state.params.noteId);
    /////////////////////////////FUNCTIONS BELOW/////////////////

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
      if (vm.note._id) {
        NotesService.update(vm.note).then(function (res) {
          vm.note = res.data.note;
          flashService.success(res.data.message); //Flash.create('success', res.data.message);
        }, function () {
          flashService.failure(); //Flash.create('danger', 'Oops! Something went wrong.');
        });
      } else {
        NotesService.create(vm.note).then(function (res) {
          vm.note = res.data.note;
          flashService.success(res.data.message); //Flash.create('success', res.data.message); //MIGRATE FLASH STUFF TO SERVICE
        }, function () {
          flashService.failure(); //  Flash.create('danger', 'Oops! Something went wrong.');
        });
      }
    }

    function deleteNote() {
      NotesService.delete(vm.note).then(function () {
        vm.clearForm();
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.notes').config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider.state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController',
      controllerAs: 'vm',
      resolve: {
        notesLoaded: notesLoaded
      }
    }).state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notesForm/notes-form.html',
      controller: 'NotesFormController',
      controllerAs: 'vm'
    });
  }
  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('meganote.signUp').directive('signUp', signUp);

  function signUp() {}
})();
//# sourceMappingURL=bundle.js.map
