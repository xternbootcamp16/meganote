(function() {
  'use strict';

  angular
    .module('megaNote.notes')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider.state(
      'notes', {
        url: '/notes',
        templateUrl: 'notes2/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          user: resolveUser,
        },
    });
  }

  resolveUser.$inject = ['authService'];
  function resolveUser(authService) {
    return authService.auth.$requireSignIn();
  }

})();
