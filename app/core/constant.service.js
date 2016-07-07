{
  'use strict';
  angular.module('meganote.noteConst',[])
  .factory('noteConstants', noteConstants);

  function noteConstants(){
    let service = {
      apiUrl: 'http://localhost:3030/'
    };
    return service;
  }
}
