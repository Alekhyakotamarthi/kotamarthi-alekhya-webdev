/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController)

    function NewPageController($location,$routeParams,PageService) {
        var vm = this;
        vm.id=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
                 vm.createPage=createPage;

        function createPage(name, description) {
            var result = PageService.createPage(name,description,vm.websiteId);
            if (result) {
                $location.url("/user/" + vm.id + "/website/"+ vm.websiteId+"/page");
            }
            else {
                vm.error = "website could not be created";
            }
        }


    }
})();
