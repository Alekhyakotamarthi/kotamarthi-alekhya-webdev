/**
 * Created by Alekhya on 10/20/2016.
 */


(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController);

    function WidgetChooserController($location,$routeParams,WidgetService) {
        var vm=this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.id = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget=createWidget;

        function init(){
            WidgetService.findWidgetsForPage(vm.pid)
                .then(
                    function (response) {
                        vm.widgets = response.data;

                    });
        }
        init();

        function createWidget(type) {
//console.log("widget type");
            //         console.log(type);
            //        console.log(vm.pid);
            if(type==="HEADER"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"HEADER",
                    pageId:vm.pid,
                    size:2,
                    text:"Header text"
                }
            }
            else if(type==="IMAGE"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"IMAGE",
                    pageId:vm.pid,
                    width:"100%",
                    url:"http://www.redcuadrada.com/wp-content/uploads/2015/08/lorem_ipsum_g.jpg"
                }
            }
            else if(type==="YOUTUBE"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"YOUTUBE",
                    pageId:vm.pid,
                    width:"100%",
                    url:"https://www.youtube.com/watch?v=aVS4W7GZSq0"
                }
            }
            else if(type==="HTML"){
                var  newWidget={
                    _id:(new Date()).getTime()+"",
                    widgetType:"HTML",
                    pageId:vm.pid,
                    text:"<p>Lorem ipsum</p>"
                }
            }

            console.log("widget::: "+newWidget.widgetType);
            WidgetService.createWidget(vm.pid,newWidget)
                .then(
                    function (response) {
                        var widgetCreated = response.data;
                        console.log("new widget "+widgetCreated);
                        if(widgetCreated){
                            var wgid=newWidget._id;
                            console.log("widget id");
                            console.log(newWidget);
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+wgid);
                        }
                        else{
                            vm.error="unable to update widget";
                        }

                    });
        }
    }
})();

