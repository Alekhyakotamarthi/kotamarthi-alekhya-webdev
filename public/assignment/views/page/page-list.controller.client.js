/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService) {

        var vm=this;
        vm.id=$routeParams.uid;
                     vm.websiteId=$routeParams.wid;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
            // console.log(vm.pages);
        }
        init();
    }
})();
