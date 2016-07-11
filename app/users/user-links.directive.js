{
  angular.module('meganote.users')
    .directive('userLinks', [

      () => {

        class UserLinksController {
          constructor() {

          }
        }

        return {
          scope: {},
          controller: UserLinksController,
          controllerAs: 'vm',
          bindToController: true,
          template: `
            <div class="user-links">
              ** USER LINKS! **
            </div>`,
        };
      }
    ]);
}
