/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController);

    function NewWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
        vm.developerId=$routeParams.uid;
        vm.createWebsite=createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.developerId)
                .then(function(response){

                    vm.websites = response.data;
                })
        }
        init();

        function createWebsite(name,description) {
            WebsiteService
                .createWebsite(name,description,vm.developerId)
                .then(function(response){

                    var newWebsite=response.data;
                    console.log("after adding");
                    console.log(newWebsite);
                    if(newWebsite){
                        $location.url("/user/"+vm.developerId+"/website");
                    }
                    else{
                        vm.error="unable to create website";
                    }
                })
        }
    }
})();
