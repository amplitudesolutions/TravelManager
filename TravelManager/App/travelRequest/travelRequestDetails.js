(function () {
    'use strict';

    // define controller
    var controllerId = "travelRequestsDetail";
    angular.module('app').controller(controllerId,
      ['$window', '$location', '$routeParams', 'common', 'datacontext', 'spWorkflow', travelRequestsDetail]);

    // create controller
    function travelRequestsDetail($window, $location, $routeParams, common, datacontext, spWorkflow) {
        var vm = this;
        // utility method to convert universal time > local time using moment.js
        vm.created = localizedCreatedTimestamp;
        vm.modified = localizedModifiedTimestap;
        
        // navigate backwards in the history stack
        //vm.goBack = goBack;
        // handle saves & deletes
        vm.goSave = goSave;
        vm.goDelete = goDelete;
        vm.goCancel = goCancel;

        // init controller
        init();

        // init controller
        function init() {
            // if an ID is passed in, load the item
            var travelRequestId = +$routeParams.id;
            if (travelRequestId && travelRequestId > 0) {
                getItem(travelRequestId);
            } else {
                createItem();
            }

            common.logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
        }

        // localized created time for the current item
        function localizedCreatedTimestamp() {
            if (vm.travelRequest) {
                return moment(vm.travelRequest.Created).format("M/D/YYYY h:mm A");
            } else {
                return '';
            }
        }

        // localized modified time for the current item
        function localizedModifiedTimestap() {
            if (vm.travelRequest) {
                return moment(vm.travelRequest.Created).format("M/D/YYYY h:mm A");
            } else {
                return '';
            }
        }

        // navigate backwards in the history stack
        function goBack() {
            $window.history.back();
        }

        function goCancel() {
            // Want to make sure navigation happens first, then revert changes or else it shows the revert changes on the screen
            datacontext.revertChanges();
            goBack();
        }

        // handle save action
        function goSave() {
            datacontext.saveChanges()
              //.then(function () {
              //    common.logger.logSuccess("Saved Travel Request.", null, controllerId);
              //})
              .then(function () {
                  // If send for approval button pushed, need to initiate workflow.
                  // Initiate workflow.

                  var wfParams = new Object();
                  wfParams['ApproverLoginName'] = 'admin@amplitudesolutions.onmicrosoft.com';

                  var travelRequestId = +$routeParams.id;

                  if (travelRequestId && travelRequestId > 0) {
                     // spWorkflow.startWorkflowOnListItem(travelRequestId, wfParams);
                  }

                  //goBack();
                  $location.path('/');
              });
        }

        // handle delete action
        function goDelete() {
            datacontext.deleteTravelRequest(vm.travelRequest)
              .then(function () {
                  common.logger.logSuccess("Deleted Travel Request.", null, controllerId);
              })
              .then(function () {
                  $location.path('/TravelRequests/');
              });
        }

        // create a new learning path item
        function createItem() {
            vm.travelRequest = datacontext.createTravelRequest();
        }

        // load the item specified in the route
        function getItem(travelRequestId) {
            datacontext.getTravelRequest(travelRequestId)
              .then(function (data) {
                  // Had to do it is way cause the date needed to be formatted.. vm.travelRequest = data didn't work.

                  vm.travelRequest = data;
                  //vm.travelRequest.AccomodationCosts = data.AccomodationCosts;
                  //vm.travelRequest.Created = data.Created;
                  //vm.travelRequest.Destination = data.Destination;
                  //vm.travelRequest.Id = data.Id;
                  //vm.travelRequest.MealCosts = data.MealCosts;
                  //vm.travelRequest.Modified = data.Modified;
                  //vm.travelRequest.Title = data.Title;
                  //vm.travelRequest.TravelCosts = data.TravelCosts;
                  //vm.travelRequest.MiscCosts = data.MiscCosts;
                  //vm.travelRequest.DepartureDate = new Date(data.DepartureDate);
                  //vm.travelRequest.ArrivalDate = new Date(data.ArrivalDate);
              });
        }
    }

})();