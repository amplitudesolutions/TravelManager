/*
 * datacontext that uses the Anuglar $http service
 */

(function () {
    'use strict';

    // define factory
    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
      ['$q', 'common', 'breeze.config', 'breeze.entities', datacontext]);

    function datacontext($q, common, breezeConfig, breezeEntities) {
        var metadataStore, travelRequestType
        var manager;
            

        // init factory
        init();

        // service public signature
        return {
            getTravelRequestListId: getTravelRequestListId,
            getTravelRequests: getTravelRequests,
            createTravelRequest: createTravelRequest,
            getTravelRequest: getTravelRequest,
            saveChanges: saveChanges,
            revertChanges: revertChanges
        };

        // init service
        function init() {
            metadataStore = breezeEntities.metadataStore;
            travelRequestType = metadataStore.getEntityType('TravelRequests');

            manager = new breeze.EntityManager({
                dataService: breezeConfig.dataservice,
                metadataStore: metadataStore
            });

            common.logger.log("service loaded", null, serviceId);
        }

        // get travel request list ID
        function getTravelRequestListId() {
            // NEED TO FIGURE OUT HOW TO GET THE LIST ID.... to get this to work!
           }

        // retrieve all travel requests, using ngHttp service
        function getTravelRequests() {
            return breeze.EntityQuery
            .from(travelRequestType.defaultResourceName)
            .using(manager)
            .execute()
            .then(function (data) {
                return data.results;
            });

        }

        function getTravelRequest(id) {
            return manager.fetchEntityByKey('TravelRequests', id, true)
            .then(function (data) {
                common.logger.log('fetched from ' + (data.fromCache ? 'cache' : 'server'), data);
                return data.entity;
            });
        }

        function createTravelRequest(initialValue) {
            return manager.createEntity(travelRequestType, initialValue);
        }

        function saveChanges() {
            return manager.saveChanges()
            .then(function (result) {
                console.log(result);
                if (result.entities.length == 0) {
                    common.logger.logWarning('Nothing Saved');
                } else {
                    common.logger.logSuccess('Saved Changes');
                }
            })
            .catch(function (error) {
                $q.reject(error);
                common.logger.logError('Error saving changes', error, serviceId);
            });
        }

        // reverts all changes back to their original state
        function revertChanges() {
            return manager.rejectChanges();
        }

    }
})();