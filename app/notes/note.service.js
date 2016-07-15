{
  angular.module('meganote.notes')
    .factory('Note', Note);

  Note.$inject = ['$resource', 'API_BASE'];
  function Note($resource, API_BASE) {
    return $resource(`${API_BASE}notes/:id`, null, {
      update: { method: 'PUT' }
    });
  }
}
