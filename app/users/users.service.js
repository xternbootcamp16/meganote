{
  angular.module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      ($http, API_BASE, AuthToken, CurrentUser) => {

        const apiURI = `${API_BASE}users/`;

        class UsersService {

          // Sign Up
          create(user) {
            return $http.post(apiURI, {
              user,
            })
              .then(
                res => {
                  AuthToken.set(res.data.authToken);
                  CurrentUser.set(res.data.user);
                }
              );
          }

          // Update profile
          update(user) {
            return $http.put(`${apiURI}${user._id}`, {
              user
            })
              .then(
                res => CurrentUser.set(res.data.user)
              );
          }

          // Sign In
          login(user) {
            return $http.post(`${API_BASE}sessions`, {
              user
            })
              .then(
                res => {
                  AuthToken.set(res.data.authToken);
                  CurrentUser.set(res.data.user);
                }
              );
          }

        }
        return new UsersService();

      }
    ]);
}
