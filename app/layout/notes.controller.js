(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope, NotesService){
    $scope.notes = NotesService.notes;
  }
})();
