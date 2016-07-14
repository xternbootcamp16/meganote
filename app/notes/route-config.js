{
  angular.module('meganote.notes')
    .config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

    .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController',
      controllerAs: 'vm',
      resolve: {
        authenticated,
      },
      data: {
        title: 'Notes'
      },
    })

    .state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form/notes-form.html',
      controller: 'NotesFormController',
      controllerAs: 'vm',
      data: {
        title: 'Notes'
      },
      onExit: ['Flash', (Flash) => {
        Flash.clear();
      }],
    });
  }

  authenticated.$inject = ['CurrentUser'];
  function authenticated(CurrentUser) {
    return new Promise((resolve, reject) => {
      if (CurrentUser.signedIn()) { resolve(); }
      else { reject(); }
    });
  }
}
