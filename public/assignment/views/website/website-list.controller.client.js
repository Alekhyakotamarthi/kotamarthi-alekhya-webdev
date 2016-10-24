/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)

    function WebsiteListController($routeParams,WebsiteService) {
        var vm=this;
        vm.id=$routeParams.uid;
        function init() {
            vm.websites=WebsiteService.findWebsitesByUser(vm.id);
        }
        init();
    }


})();
