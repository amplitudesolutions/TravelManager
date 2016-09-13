/// <reference path="travelRequest/travelRequestDetails.html" />
(function () {
    'use strict';

    var app = angular.module('app');

    // get all the routes
    app.constant('routes', getRoutes());

    // config routes & their resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // build the routes
    function getRoutes() {
        return [
          {
              url: '/',
              config: {
                  templateUrl: 'app/dashboard/dashboard.html',
                  title: 'dashboard',
                  settings: {
                      nav: 0,
                      content: 'dashboard',
                      quickLaunchEnabled: false
                  }
              }
          },
          {
              url: '/settings',
              config: {
                  templateUrl: 'app/settings/settings.html',
                  title: 'Settings',
                  settings: {
                      nav: 2,
                      content: 'Settings',
                      quickLaunchEnabled: false
                  }
              }
          },
          {
              url: '/TravelRequests',
              config: {
                  templateUrl: 'app/travelRequest/travelRequest.html',
                  title: 'Travel Requests',
                  settings: {
                      nav: 1,
                      content: 'Travel Request',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/TravelRequests/:id',
              config: {
                  templateUrl: 'app/travelRequest/travelRequestDetails.html',
                  title: 'Travel Requests',
                  settings: {
                      nav: 1.1,
                      content: 'Travel Request Detail',
                      quickLaunchEnabled: false
                  }
              }
          }
        ];
    }
})();