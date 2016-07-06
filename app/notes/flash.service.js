(function(){
  'use strict';
  angular.module('meganote.notes').factory('flashService',flashService);

  flashService.$inject = ['Flash'];
  function flashService(Flash){
    var service = {
      success : success,
      fail: fail
    };
    return service;
////////////////////////functions below///////////////
    function success(message){
      Flash.create('success', message); //MIGRATE FLASH STUFF TO SERVICE
    }
    function fail() {
      Flash.create('danger',' Oops! Something went wrong.'); //MIGRATE FLASH STUFF TO SERVICE
    }
  }
})();
