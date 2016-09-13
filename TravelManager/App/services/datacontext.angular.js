/*
 * datacontext that uses the Anuglar $http service
 */

(function () {
    'use strict';

    // define factory
    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', 'spContext', datacontext]);

    function datacontext($rootScope, $http, $resource, $q, config, common, spContext) {
        // init factory
        init();

        // service public signature
        return {
            getTrListResource: getTrListResource,
            getTravelRequestListId: getTravelRequestListId,
            getTrResource: getTrResource,
            getTravelRequests: getTravelRequests,
            createTravelRequest: createTravelRequest,
            saveTravelRequest: saveTravelRequest,
            getTravelRequest: getTravelRequest
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getTrListResource() {
            //   THEN build the resource to the specific item
            return $resource('_api/web/lists/getbytitle(\'Travel Requests\')',
            {},
            {
                get: {
                    method: 'GET',
                    params: {
                        '$select': 'Id,Title,Description,DefaultView'
                    },
                    headers: {
                        'Accept': 'application/json;odata=verbose;'
                    }
                }
            });
        }

        // get travel request list ID
        function getTravelRequestListId() {
            var deferred = $q.defer();

            // get resource
            var resource = getTrListResource();
            resource.get({}, function (data) {
                deferred.resolve({ travelRequestListId: data.d.Id });
                common.logger.log("retrieved travel request id", data, serviceId);
            }, function (error) {
                deferred.reject(error);
                common.logger.logError("retrieve travel request id", error, serviceId);
            });

            return deferred.promise;
        }

        // get the Learning Path angular resource reference
        function getTrResource(currentItem) {
            // if an ID is passed in, 
            //   ELSE create resource pointing to collection for a new item
            if (+currentItem.Id) {
                //   THEN build the resource to the specific item
                return $resource('_api/web/lists/getbytitle(\'Travel Requests\')/items(:itemId)',
                { itemId: currentItem.Id },
                {
                    get: {
                        method: 'GET',
                        params: {
                            '$select': 'Id,Title,AccomodationCosts,TravelCosts,MiscCosts,MealCosts,Destination,ArrivalDate,DepartureDate,Created,Modified'
                        },
                        headers: {
                            'Accept': 'application/json;odata=verbose;'
                        }
                    },
                    post: {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json;odata=verbose;',
                            'Content-Type': 'application/json;odata=verbose;',
                            'X-RequestDigest': spContext.securityValidation,
                            'X-HTTP-Method': 'MERGE',
                            'If-Match': currentItem.__metadata.etag
                        }
                    },
                    delete: {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json;odata=verbose;',
                            'Content-Type': 'application/json;odata=verbose;',
                            'X-RequestDigest': spContext.securityValidation,
                            'If-Match': '*'
                        }
                    }
                });
            } else {
                return $resource('_api/web/lists/getbytitle(\'Travel Requests\')/items',
                  {},
                  {
                      post: {
                          method: 'POST',
                          headers: {
                              'Accept': 'application/json;odata=verbose;',
                              'Content-Type': 'application/json;odata=verbose;',
                              'X-RequestDigest': spContext.securityValidation
                          }
                      }
                  });
            }
        }

        // retrieve all travel requests, using ngHttp service
        function getTravelRequests() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '_api/web/lists/getbytitle(\'Travel Requests\')/items?$select=Id,Title&$orderby=Title'
            }).success(function (data) {
                common.logger.log("retrieved TR partials via ngHttp", data, serviceId);
                deferred.resolve(data.d.results);
            }).error(function (error) {
                var message = "data context ngHttp error: " + error.message;
                common.logger.logError(message, error, serviceId);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getTravelRequest(id) {
            var tr = new trm.models.travelRequest();
            tr.Id = id;

            // get resource
            var resource = getTrResource(tr);

            var deferred = $q.defer();
            resource.get({}, function (data) {
                deferred.resolve(data.d);
                common.logger.log("retrieved travel request", data, serviceId);
            }, function (error) {
                deferred.reject(error);
                common.logger.logError("retrieve travel request", error, serviceId);
            });

            return deferred.promise;
        }

        function createTravelRequest() {
            return new trm.models.travelRequest();
        }

        function saveTravelRequest(travelRequest) {
            // get resource
            console.log(travelRequest);
            var resource = getTrResource(travelRequest);
            console.log(resource);
            var deferred = $q.defer();

            resource.post(travelRequest, function (data) {
                deferred.resolve(data);
                common.logger.log("save travel request", data, serviceId);
            }, function (error) {
                deferred.reject(error);
                common.logger.logError("Save travel request", error, serviceId);
            });

            return deferred.promise;

        }

    }
})();