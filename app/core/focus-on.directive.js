{
  angular.module('meganote')
    .directive('focusOn', focusOn);

  function focusOn() {
    return {
      restrict: 'A',
      link: (scope, elem, _attr) => {
        elem.ready(() => elem[0].focus());
      }
    };
  }
}
