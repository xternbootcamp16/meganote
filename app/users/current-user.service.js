{
  angular.module('meganote.users')
    .service('CurrentUser', ['$window', $window => {

      class CurrentUser {
        constructor() {
          this.user = JSON.parse($window.localStorage.getItem('currentUser'));
        }
        set(user) {
          this.user = user;
          $window.localStorage.setItem('currentUser', JSON.stringify(this.user));
        }
        get() {
          return this.user || {};
        }
        clear() {
          this.user = undefined;
          $window.localStorage.removeItem('currentUser');
        }
      }
      return new CurrentUser();

    }]);
}
