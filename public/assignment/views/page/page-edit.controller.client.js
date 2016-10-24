/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController)

    function EditPageController($location,$routeParams, PageService) {
        var vm = this;
        vm.id = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;
        function init() {
                    vm.page = PageService.findPageById(vm.pageId);
        }

        init();


            function    deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if (result) {
                $location.url("/user/" + vm.id + "/website/"  + vm.websiteId + "/page");
            }
            else {
                vm.error = "page could not be deleted";
            }
        }


        function updatePage(pageId, name,description) {
            var result = PageService.updatePage(pageId, name,description);
            if (result) {
                $location.url("/user/" + vm.id + "/website/"  + vm.websiteId + "/page");
            }
            else {
                vm.error = "unable to update page";
            }
        }
    }
})();
