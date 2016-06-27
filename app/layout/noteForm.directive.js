(function() {
  'use strict';

  angular
    .module('megaNote.layout')
    .directive('crNoteform', crNoteform);

  function crNoteform() {
    return {
      templateUrl: 'layout/noteForm.html',
      restrict: 'E',
      controller: NoteFormController,
      controllerAs: 'vm',
      scope: {},
    };
  }

  NoteFormController.$inject = ['$state', 'authService'];
  function NoteFormController($state, authService) {
    var vm = this;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;

    function logout() {
      authService.logout();
      $state.go('home');
    }
  }
})();
