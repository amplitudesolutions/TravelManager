(function () {
    'use strict';

    // create app
    var app = angular.module('app', [
      // ootb angular modules
      'ngRoute',      // app route (url path) support
      'ngCookies',    // cookie read/write support
      'ngSanitize',   // fixes HTML issues in data binding
      'ngResource',   // assists with rest calls
      'ngAnimate',    // animation capabilities
      'breeze.angular',
      'breeze.directives',
      'officeuifabric.core', //Angular Office UI Fabric
      'officeuifabric.components.datepicker', //Angular Office UI Fabric Date picker support
      // my custom modules
      'common'
    ]);

    // startup code
    app.run(['$route', function ($route) {

    }]);
})();