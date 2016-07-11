{
  angular.module('meganote.users')
    .directive('userLinks', [

      'CurrentUser',
      (CurrentUser) => {

        class UserLinksController {
          user() {
            return CurrentUser.get();
          }
          signedIn() {
            return CurrentUser.signedIn();
          }
        }

        return {
          scope: {},
          controller: UserLinksController,
          controllerAs: 'vm',
          bindToController: true,
          template: `

          <div class="user-links">
            <span ng-show="vm.signedIn()">
              Signed in as {{ vm.user().name }}
            </span>
            <span ng-show="!vm.signedIn()">
              <a ui-sref="sign-up">Sign up for Meganote today!</a>
            </span>
          </div>

          `
        };
      }

    ]);
}
