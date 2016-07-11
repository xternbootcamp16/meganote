{
  angular.module('meganote.users')
    .directive('userLinks', [

      () => {

        class UserLinksController {

        }

        return {
          scope: {},
          controller: UserLinksController,
          controllerAs: 'vm',
          bindToController: true,
          template: `

          <div class="user-links">
            ** USER LINKS **
          </div>

          `
        };
      }

    ]);
}
