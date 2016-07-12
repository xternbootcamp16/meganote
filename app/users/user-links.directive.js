{
  angular.module('meganote.users')
    .directive('userLinks', [

      'AuthToken',
      'CurrentUser',
      (AuthToken, CurrentUser) => {

        class UserLinksController {
          user() {
            return CurrentUser.get();
          }
          signedIn() {
            return CurrentUser.signedIn();
          }
          logout() {
            CurrentUser.clear();
            AuthToken.clear();
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
              <a ui-sref="user-profile">Signed in as {{ vm.user().name }}</a>
              |
              <a ui-sref="sign-up" ng-click="vm.logout()">Logout</a>
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
