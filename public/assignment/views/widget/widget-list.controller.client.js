/**
 * Created by Alekhya on 10/20/2016.
 */


(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)

    function WidgetListController($location,$routeParams,WidgetService,$sce) {
        var vm = this;
        vm.id=$routeParams.uid;

        vm.websiteId= $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
                vm.widgets=WidgetService.findWidgetsByPageId(vm.pageId);
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

        function getSafeHtml(html){
            return $sce.trustAsHtml(html);
        }

        function getSafeUrl(url)
        {
            var parts = url.split('/');
            var id = parts[parts.length-1];
            url = 'https://www.youtube.com/embed/' +id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);



        }


    }
})();

