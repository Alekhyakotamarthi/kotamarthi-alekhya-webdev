/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)

    function PageListController($routeParams,PageService) {
        var vm=this;
        vm.id=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        function init() {
            vm.pages=PageService.findPageByWebsiteId(vm.websiteId);

        }
        init();
    }


})();
