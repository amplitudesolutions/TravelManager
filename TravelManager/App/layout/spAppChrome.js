(function () {
    'use strict';

    // define controller
    var controllerId = 'spAppChrome';
    angular.module('app').controller(controllerId,
      ['$rootScope', 'spContext', 'common', 'config', spAppChrome]);

    // create controller
    function spAppChrome($rootScope, spContext, common, config) {
        var vm = this;
        var logger = common.logger;
        var spChromeControlData = undefined;

        // init controller
        init();

        // init controller
        function init() {
            // create chrome control settings
            spChromeControlData = {
                siteUrl: spContext.hostWeb.url,
                siteTitle: spContext.hostWeb.title,
                appIconUrl: spContext.hostWeb.logoUrl,
                appTitle: config.title,
                settingsLinks: [
                  {
                      linkUrl: "Lists/TravelRequests",
                      displayName: "[SHAREPOINT LIST] Travel-Requests"
                  }//,
                  //{
                  //    linkUrl: "Lists/TravelRequestDetails",
                  //    displayName: "[SHAREPOINT LIST] Travel-Request-Details"
                  //}
                ]
            };

            // create the sharepoint chrome control
            var nav = new SP.UI.Controls.Navigation("chrome_ctrl_container", spChromeControlData);

            // show chrome control
            nav.setVisible(true);

            // hide top app chrome (image & app name)
            nav.setBottomHeaderVisible(false);

            logger.log("spAppChrome loaded", null, controllerId);
            common.activateController([], controllerId);
        }

    }

})();