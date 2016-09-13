(function () {
    'use strict';

    // define controller
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId,
      ['common', 'datacontext', '$location', dashboard]);

    // init controller
    function dashboard(common, datacontext, $location) {
        var vm = this;
        var logger = common.logger;

        // Define view function
        vm.openRequest = openRequest;
        vm.createTravelRequest = createTravelRequest;
        vm.settingsClick = settingsClick;

        // init controller
        init();

        // init controller
        function init() {
            logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
            //console.log(datacontext.getCurrentUser());

            console.log();
        }
        
        getTravelRequests();

        function getTravelRequests() {
            datacontext.getTravelRequests()
            .then(function (data) {
                if (data) {
                    vm.travelRequests = data;
                } else {
                    throw new Error('Error obtaining data');
                }
            })
            .catch(function (error) {
                common.logger.logError('Error obtaining Travel Requests', error, controllerId);
            });
        }

        function openRequest(travelRequestId) {
            if (travelRequestId) {
                return $location.path('/TravelRequests/' + travelRequestId);
            } else {
                common.logger.logWarning('invalid item selected', travelRequestId, controllerId);
            }
        }
        
        function settingsClick() {
            return $location.path('/settings');
        }

        function createTravelRequest() {
            return $location.path('/TravelRequests/new');
        }

    }
})();