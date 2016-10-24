            /**
             * Created by Alekhya on 10/20/2016.
             */


            (function () {
                angular
                    .module("WebAppMaker")
                    .controller("WidgetEditController",WidgetEditController)

                function WidgetEditController($location,$routeParams,WidgetService,$sce) {
                    var vm = this;
                    vm.id=$routeParams.uid;

                    vm.websiteId= $routeParams.wid;
                    vm.pageId = $routeParams.pid;
                    vm.wid = $routeParams.wid;
                            vm.wgid = $routeParams.wgid;
                    vm.updateWidget = updateWidget;
                                vm.deleteWidget = deleteWidget;

                    function init() {
                            vm.widget=WidgetService.findWidgetsById(vm.wgid);
                    }

                    init();

                    function updateWidget(widget) {
                        console.log(widget);
                        var result=WidgetService.updateWidget(vm.wgid,widget);
                        console.log(result);
                        if(result){
                            $location.url("/user/" + vm.id + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                        }
                        else{
                            vm.error="unable to update widget";
                        }
                    }

                    function deleteWidget(widget) {
                        var result=WidgetService.deleteWidget(vm.wgid,widget);
                        if(result){
                            $location.url("/user/" + vm.id + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                        }
                        else{
                            vm.error="unable to delete widget";
                        }
                    }



                }
            })();

