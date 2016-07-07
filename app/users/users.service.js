{
  class UsersService {
    create(user) {
      console.log('CREATED!');
      console.log(user);
    }
  }

  angular.module('meganote.users')
    .service('UsersService', UsersService);
}
