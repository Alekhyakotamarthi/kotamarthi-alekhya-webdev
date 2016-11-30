/**
 * Created by Alekhya on 11/29/2016.
 */
module.exports=function () {
    var mongoose=require("mongoose");
    var WidgetSchema=mongoose.Schema({
        order:Number,
        pageId:{type:mongoose.Schema.ObjectId,ref:"Page"},
        widgetType:String,
        name:String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletetable:Boolean,
        formatted:Boolean,
        dateCreated:{type:Date,default:Date.now}
    },{collection:"assignment.widget"});
    return WidgetSchema;
};