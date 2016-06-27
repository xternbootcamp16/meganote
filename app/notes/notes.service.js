(function() {
  'use strict';
  
  angular.module('meganote.notes').factory('NotesService', NotesService);

  NotesService.$inject = ['$http'];
})();