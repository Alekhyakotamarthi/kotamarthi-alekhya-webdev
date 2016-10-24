/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ]

    function       WebsiteService() {
        var api = {
            findWebsitesByUser: findWebsitesByUser,
                           updateWebsite: updateWebsite,
            findWebsiteById: findWebsiteById,
                         deleteWebsite: deleteWebsite,
                         createWebsite: createWebsite
        }
        return api;

        function findWebsitesByUser(id) {
            var resultset=[];
            for(var i in websites){
                if(websites[i].developerId===id){
                    resultset.push(websites[i]);
                }
            }
            return resultset;
        }

                     function updateWebsite(websiteId,name,description){

            for(var i in websites){
                if(websites[i]._id===websiteId){
                    websites[i]._name=name;
                    websites[i].description=description;
                    return true;
                }
            }
            return false;

        }

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websites[i]._id===websiteId){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites){
                if(websites[i]._id===websiteId){
                    return websites[i];
                }
            }
            return null;
        }

        function createWebsite(name,desc,uid) {
            var newWebsite={
                _id:(new Date()).getTime()+"",
                name:name,
                developerId:uid,
                description:desc
            };
            websites.push(newWebsite);
            return newWebsite;
        }



    }

})();
