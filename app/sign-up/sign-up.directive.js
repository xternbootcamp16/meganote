{
  angular.module('meganote.signUp')
    .directive('signUp', signUp);

  function signUp() {
    return {
      template: '<h1>Sign Up</h1>',
    };
  }
}
