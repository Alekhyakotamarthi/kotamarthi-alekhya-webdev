/**
 * Created by Alekhya on 10/20/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function            EditWebsiteController($location,$routeParams, WebsiteService){
        var vm=this;
        vm.id = $routeParams.uid;
                     vm.websiteId = $routeParams.wid;
        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;

        function init(){
            // WebsiteService.findWebsitesByUser(vm.id);
            WebsiteService.findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;

                    });

            WebsiteService.findWebsitesByUser(vm.id)
                .then(
                    function (response) {
                        vm.websites = response.data;
                        console.log("website edit "+vm.websites);
                    });
        }

        init();

        function updateWebsite(name,desc) {

            console.log(name);

            var updated_website= {
                "_id": vm.websiteId,
                "name" : name,
                "description" : desc
            };

            WebsiteService
                .updateWebsite(vm.websiteId,updated_website)

                .then(function(response){
                    var result=response.data;
                    console.log(result);
                    if(result){
                        $location.url("/user/"+vm.id+"/website");
                    }
                    else{
                        vm.error="website not updated!";
                    }
                });
        }
        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("user/"+vm.id+"/website");
                    }else{
                        vm.error = "website not deleted";
                    }
                });

        }

    }

})();