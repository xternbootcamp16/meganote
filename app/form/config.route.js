(function() {
    'use strict';

    angular.module('meganote.form', ['ui.router'])
        .config(formConfig)
        .controller('FormController', FormController);

    formConfig.$inject = ['$stateProvider'];

    function formConfig($stateProvider) {
        $stateProvider.state('notes.form', {
                url: '/:noteId',
                templateUrl: 'notes/form.html',
                controller: 'NotesFormController'
            });
    }
}());
