$scope.delete = function() {
  NotesService.delete($scope.note)
    .then(function() {
      $scope.clearForm();
    });
};
}
}());
