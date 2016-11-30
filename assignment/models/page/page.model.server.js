/**
 * Created by Alekhya on 11/29/2016.
 */
module.exports=function () {

    var mongoose=require("mongoose");
    var PageSchema=require("./page.schema.server.js")();
    var Page=mongoose.model("Page",PageSchema);
    var api={
        findAllPagesForWebsite:findAllPagesForWebsite,
        createPage:createPage,
        findPageById: findPageById,
        updatePage:updatePage,
        deletePage:deletePage,
    };
    return api;

    function findAllPagesForWebsite(websiteId) {
        return Page.find({"websiteId":websiteId});
    }
    function createPage(websiteId,page){
        page._website = websiteId;
        return Page.create(page);
    }

    function findPageById(pageId){

        return Page.findById(pageId);
    }

    function updatePage(pageId,page){
        return Page.update({_id:pageId},{$set:{name:page.name,
            description:page.description}});
    }

    function deletePage(pageId){

        return Page.remove({_id:pageId});
    }
};