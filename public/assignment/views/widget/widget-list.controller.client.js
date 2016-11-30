/**
 * Created by Alekhya on 10/20/2016.
 */


(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($routeParams,WidgetService,$sce) {
        var vm=this;
        vm.id = $routeParams.uid;
                    vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

                         vm.getSafeHtml=getSafeHtml;
                      vm.getSafeUrl=getSafeUrl;
        vm.reorderWidget=reorderWidget;

        function init(){
            WidgetService.findWidgetsForPage(vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;

                    });


        }
        init();

        function getSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
                  function getSafeUrl(widget){
                      var urlParts=widget.url.split("/");
                      var id=urlParts[urlParts.length -1];
                      var url="https://www.youtube.com/embed/"+id;
                      console.log(url);
                      return $sce.trustAsResourceUrl(url);
        }
        function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function (response) {

                        init();
                    });
        }

    }


})();