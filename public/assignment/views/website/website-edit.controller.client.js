/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($location,$routeParams,WebsiteService) {
        var vm = this;
        vm.id = $routeParams.uid;
                     vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            console.log(vm.website);
            vm.websites = WebsiteService.findWebsitesByUser(vm.id);
        }

        init();


        function updateWebsite(name, description) {
            var result = WebsiteService.updateWebsite(vm.websiteId, name, description);
            if (result) {
                $location.url("/user/" + vm.id + "/website");
            }
            else {
                vm.error = "website could not be updated";
            }
        }


        function deleteWebsite(websiteId) {
            console.log(websiteId)
            var result = WebsiteService.deleteWebsite(websiteId);
            if (result) {
                $location.url("/user/" + vm.id + "/website");
            }
            else {
                vm.error = "unable to delete website";
            }
        }
    }
})();
