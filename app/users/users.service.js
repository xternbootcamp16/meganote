{

  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      ($http, API_BASE) => {
        class UsersService {
          create(user) {
            $http.get(API_BASE)
              .then(
                res => {
                  console.log(res.data);
                }
              );
          }
        }
        return new UsersService();
      }
    ]);
  }
