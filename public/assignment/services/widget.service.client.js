/**
 * Created by Alekhya on 10/20/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http) {


        var api = {
            findWidgetsForPage: findWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget:updateWidget,
            deleteWidget: deleteWidget,
            createWidget:createWidget,
            reorderWidget: reorderWidget
        };
        return api;

        function reorderWidget(pageId, start, end) {
            return $http.put("/page/"+pageId+"/widget?start="+start+"&end="+end);
        }

        function findWidgetsForPage(pid) {
            console.log("in widget client "+pid);
            var url ="/api/page/"+pid+"/widget" ;
            console.log("url here "+url);
            return $http.get(url);

        }

        function findWidgetById(wgid) {
            var url = "/api/widget/"+wgid;
            return $http.get(url);
        }

        function updateWidget(widgetId,widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url,widget);

        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);

        }


        function createWidget(pageId,newWidget) {

            var widget_new = newWidget;
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url,widget_new);

        }



    }
})();