/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)

    function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm = this;
        vm.id=$routeParams.uid;
        vm.createWebsite=createWebsite;
        function init() {
            vm.websites=WebsiteService.findWebsitesByUser(vm.id);
        }

        init();


        function createWebsite(name, description) {
            var result = WebsiteService.createWebsite(name,description,vm.id);
            if (result) {
                $location.url("/user/" + vm.id + "/website");
            }
            else {
                vm.error = "website could not be created";
            }
        }


    }
})();
