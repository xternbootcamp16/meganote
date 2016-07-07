{
  angular.module('meganote.signUp')
    .directive('signUp', () => {

      class SignUpController {
        constructor(UsersService) {
          this.UsersService = UsersService;
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
