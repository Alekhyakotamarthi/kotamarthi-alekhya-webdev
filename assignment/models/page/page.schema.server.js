/**
 * Created by Alekhya on 11/29/2016.
 */

module.exports=function () {
    var mongoose=require("mongoose");
    var PageSchema=mongoose.Schema({
        websiteId:{type:mongoose.Schema.ObjectId,ref:"Website"},
        name:String,
        title:String,
        description:String,
        dateCreated:{type:Date,default:Date.now}

    },{collection:"assignment.page"});
    return PageSchema;
};