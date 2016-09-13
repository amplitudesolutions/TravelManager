(function () {
    'use strict';

    // define controller
    var controllerId = "settings";
    angular.module('app').controller(controllerId,
      ['$location', 'common', 'datacontext', settings]);

    // create controller
    function settings($location, common, datacontext) {
        var vm = this;

        // init controller
        init();

        // init controller
        function init() {
            common.logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
        }
    };


})();