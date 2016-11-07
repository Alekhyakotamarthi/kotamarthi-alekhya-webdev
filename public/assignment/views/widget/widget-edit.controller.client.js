            /**
             * Created by Alekhya on 10/20/2016.
             */


            (function(){
                angular
                    .module("WebAppMaker")
                    .controller("WidgetEditController",WidgetEditController);

                function WidgetEditController($location,$routeParams,WidgetService,$sce) {
                    var vm=this;
                    vm.id = $routeParams.uid;
                    vm.websiteId = $routeParams.wid;
                    vm.pageId = $routeParams.pid;
                    vm.wgid = $routeParams.wgid;

                    vm.updateWidget=updateWidget;
                    vm.deleteWidget=deleteWidget;

                    function init(){
                        WidgetService.findWidgetById(vm.wgid)
                            .then(
                                function (response) {
                                    vm.widget = response.data;

                                });
                    }
                    init();


                    function deleteWidget() {
                        WidgetService.deleteWidget(vm.wgid)
                            .then(
                                function (response) {
                                    var widgetDelete= response.data;
                                    if(widgetDelete){
                                        $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                                    }
                                    else{
                                        vm.error="unable to delete widget";
                                    }

                                });
                    }

                    function updateWidget(widget) {
                        WidgetService.updateWidget(vm.wgid,widget)
                            .then(
                                function (response) {
                                    var updateWidget= response.data;
                                    if(updateWidget){
                                        $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                                    }
                                    else{
                                        vm.error="unable to update widget";
                                    }
                                });


                    }


                }


            })();