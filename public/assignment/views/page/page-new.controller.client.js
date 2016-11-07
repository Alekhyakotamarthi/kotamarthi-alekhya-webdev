/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($location,$routeParams,PageService) {
        var vm=this;
        vm.id=$routeParams.uid;
                     vm.websiteId=$routeParams.wid;
        vm.createPage=createPage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
        }
        init();

        function createPage(name,desc) {
            PageService.createPage(vm.websiteId,name,desc)
                .then(
                    function (response) {
                        var newPage= response.data;
                        if(newPage){
                            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                        }
                        else{
                            vm.error="Unable to create new page";
                        }
                    });

        }


    }
})();