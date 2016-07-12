{
  angular.module('meganote')
    .factory('AuthInterceptor', AuthInterceptor)
    .config(authConfig);

    AuthInterceptor.$inject=['AuthToken'];
    function AuthInterceptor(AuthToken) {
      return {
        request(req) {
          req.headers.Authorization = AuthToken.get();
          return req;
        }
      };
    }

    authConfig.$inject = ['$httpProvider'];
    function authConfig($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    }
}
