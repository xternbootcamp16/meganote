{
  class UsersService {
    constructor($http) {
      this.$http = $http;
      this.apiUrl = 'http://localhost:8000';
    }
    create(user) {
      $http.get()
          .then(
            () => { console.log('asdf');}
          );
    }
  }
  angular.module('meganote.users')
  .service('UsersService', ['$http', UsersService]);
}
