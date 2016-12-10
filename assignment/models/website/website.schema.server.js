/**
 * Created by Alekhya on 11/29/2016.
 */

module.exports=function () {
    var mongoose=require("mongoose");

    var WebsiteSchema=mongoose.Schema({
                      developerId:{type: mongoose.Schema.ObjectId, ref: "User"},
        name:String,
                   description:String,
                       dateCreated:{type:Date,default: Date.now}
    },{collection: "assignment.website"});
    return WebsiteSchema;
};