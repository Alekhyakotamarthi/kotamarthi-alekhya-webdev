/**
 * Created by Alekhya on 11/29/2016.
 */
module.exports=function () {

    var mongoose=require("mongoose");
    var WidgetSchema=require("./widget.schema.server.js")();
    var Widget=mongoose.model("Widget",WidgetSchema);
    var api={
        findAllWidgetsForPage:findAllWidgetsForPage,
        createWidget:createWidget,
        findWidgetById: findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget: reorderWidget,
    };
    return api;

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"pageId":pageId});
    }
    function createWidget(pageId,widget){
        return Widget
            .find({pageId: widget.pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                });
    }

    function findWidgetById(widgetId){

        return Widget.findById(widgetId);
    }

    function updateWidget(type,widget){
        if(widget.widgetType==="HEADER") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text,
                        size:widget.size,
                        name:widget.name
                    }
                })
        }
        else if(widget.widgetType==="HTML") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text
                    }
                })
        }
        else if(widget.widgetType==="IMAGE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }
        else if(widget.widgetType==="YOUTUBE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }
        else if(widget.widgetType==="TEXT") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        rows :widget.rows,
                        placeholder :widget.placeholder,
                        formatted:widget.formatted
                    }
                })
        }



    }

    function deleteWidget(widgetId){

        return Widget.remove({_id:widgetId});
    }

    function reorderWidget(start,end,pageId)
    {
        console.log("reorder widget called")

        return Widget
            .find({pageId: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    console.log(widget.order);
                    if(start< end){
                        if(widget.order === start){
                            widget.order = end;
                            widget.save();
                        }
                        else if(widget.order>start&&widget.order<=end){
                            widget.order--;
                            widget.save();
                        }
                    } else{
                        if(widget.order=== start){
                            widget.order = end;
                            widget.save();
                        }
                        else if(widget.order< start&&widget.order>=end){
                            widget.order++;
                            widget.save();
                        }
                    }
                });
                console.log(widgets);
            });

    }
};