/**
 * Created by Alekhya on 11/29/2016.
 */
module.exports=function () {

    var mongoose=require("mongoose");
    var WebsiteSchema=require("./website.schema.server.js")();
    var Website=mongoose.model("Website",WebsiteSchema);
    var api={
        findAllWebsitesForUser:findAllWebsitesForUser,
        createWebsite:createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
    };
    return api;

    function findAllWebsitesForUser(userId) {
        return Website.find({"developerId":userId});
    }
    function createWebsite(userId,website){
        website._user = userId;
        return Website.create(website);
    }

    function findWebsiteById(websiteId){
        console.log(websiteId);
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId,website){
        console.log(websiteId);
        return Website.update({_id:websiteId},{$set:{name:website.name,
            description:website.description}});
    }

    function deleteWebsite(websiteId){

        return Website.remove({_id:websiteId});
    }
};