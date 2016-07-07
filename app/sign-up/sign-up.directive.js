(function() {
  'use strict';
  angular.module('meganote.signUp').directive('signUp',['UsersService',(UsersService)=>{



    class SignUpController {
      constructor() {
        this.user = {};
      }
      submit(){
        UsersService.create(this.user);
      }
    }
    return {
      scope: {},
      templateUrl: '/sign-up/sign-up.html',
      bindToController: true,
      controllerAs: 'vm',
    };

  }]);
})();
