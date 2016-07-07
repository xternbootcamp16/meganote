{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      ($http, API_BASE) => {

        class UsersService {
          create(user) {
            return $http.post(`${API_BASE}users`, {
              user,
            })
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
