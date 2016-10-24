/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ]

    function       PageService() {
        var api = {
                     findPageByWebsiteId: findPageByWebsiteId,
            updatePage: updatePage,
            deletePage: deletePage,
            findPageById: findPageById,
            createPage:createPage,

        }
        return api;

        function findPageByWebsiteId(websiteId) {
            var resultset=[];
            for(var i in pages){
                if(pages[i].websiteId===websiteId){
                    resultset.push(pages[i]);
                }
            }
            return resultset;
        }

        function findPageById(pageId) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    return pages[i];
                }
            }
           return null;
        }

        function updatePage(pageId,name,description){

            for(var i in pages){
                if(pages[i]._id===pageId){
                    pages[i]._name=name;
                    pages[i].description=description;
                    return true;
                }
            }
            return false;

        }

        function deletePage(pageId) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function createPage(name,desc,wid) {
            var newPage={
                _id:(new Date()).getTime()+"",
                name:name,
                    websiteId:wid,
                description:desc
            };
            pages.push(newPage);
            return newPage;
        }





    }

})();
