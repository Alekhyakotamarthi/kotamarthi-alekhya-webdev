/**
 * Created by Alekhya on 10/20/2016.
 */


(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)

    function WidgetChooserController($location,$routeParams,WidgetService,$sce) {
        var vm = this;
        vm.id=$routeParams.uid;

        vm.websiteId= $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wid = $routeParams.wid;
        vm.wgid = $routeParams.wgid;
                vm.createWidget = createWidget;

        function createWidget(widgettype) {
            if(widgettype==="HEADER"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"HEADER",
                    pageId:vm.pageId,
                    size:2,
                    text:"Default"
                }
            }
            else if(widgettype==="IMAGE"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"IMAGE",
                    pageId:vm.pageId,
                    width:"100%",
                    url:"http://lorempixel.com/400/200/"
                }
            }
            else if(widgettype==="YOUTUBE"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"YOUTUBE",
                    pageId:vm.pageId,
                    width:"100%",
                    url:"http://lorempixel.com/400/200/"
                }
            }
            else if(widgettype==="HTML"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"HTML",
                    pageId:vm.pageId,
                    text:"<p>Lorem ipsum</p>",
                }
            }
            var success=WidgetService.createWidget(vm.pageId,newWidget);
            console.log(newWidget);
            if(success){
                var widgetId=newWidget._id;
                var widgettype = newWidget.widgetType;
                $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgetId);
            }
            else{
                vm.error="unable to create widget";
            }
        }

    }
})();

