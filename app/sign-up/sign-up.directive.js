(function() {
  'use strict';
  angular.module('meganote.signUp').directive('signUp',signUp);

  function signUp() {
    return {
      templateUrl: '/app/',
    };
  }
})();
