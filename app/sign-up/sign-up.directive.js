{
  angular.module('meganote.signUp')
    .directive('signUp', () => {

      class SignUpController {
        constructor() {
          this.user = {};
        }
        submit() {
          console.log(this.user);
        }
      }

      return {
        scope: {},
        controller: SignUpController,
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: '/sign-up/sign-up.html',
      };
    });
}
