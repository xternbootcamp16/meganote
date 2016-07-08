{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      ($http, API_BASE) => {

        const apiURI = `${API_BASE}users/`;

        class UsersService {
          create(user) {
            return $http.post(apiURI, {
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
