/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

                function EditPageController($location,$routeParams,PageService) {

        var vm=this;
        vm.id=$routeParams.uid;
                    vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages= response.data;
                    });
            PageService.findPageById(vm.pageId)
                .then(
                    function (response) {
                        vm.page= response.data;
                    });
        }
        init();

        function updatePage(name,desc) {
            console.log(name);
            var new_page = {
                         name:name,
                         _id:vm.pageId,
                websiteId: vm.websiteId,
                description:desc
            };

            console.log(new_page);

            PageService.updatePage(vm.pageId,new_page)
                .then(
                    function (response) {
                        var UpdatedPage=response.data;
                        console.log("UpdatedPage");
                        console.log(UpdatedPage);
                        if(UpdatedPage){
                            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                        }
                        else{
                            vm.error="page not updated";
                        }
                    });

        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(
                    function (response) {
                        var DeletedPage= response.data;
                        if(DeletedPage){
                            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                        }
                        else{
                            vm.error="page not deleted";
                        }
                    });

        }


    }
})();