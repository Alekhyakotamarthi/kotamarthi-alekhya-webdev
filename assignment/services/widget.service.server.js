/**
 * Created by Alekhya on 11/6/2016.
 */

module.exports = function(app){

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

                function uploadImage(req, res) {
                        console.log("i am here");
        // console.log(req.body);
        //console.log(req.file);
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        console.log(myFile);

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                widget.url="/uploads/"+filename;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }
         function reorderWidget(req, res) {
              var start = req.query.start;
        var end = req.query.end;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.sendStatus(200);
    }

    function getIndexOf(pid,i){
        resultset = [];
        for(var w in widgets){
            if(widgets[w].pageId == pid){
                resultset.push(w);
            }
        }
        return resultset[i];
    }



    function findAllWidgetsForPage(req,res)
    {

        var pid=req.params.pageId;
        //console.log("i am here "+pid);
        var result = [];
        for (var i in widgets) {
            var widget = widgets[i];
            if (widget.pageId === pid) {
                result.push(widget);
            }

        }
        console.log("in server widgets list "+result);
        res.send (result);


    }


    function findWidgetById(req,res){

        var wgid=req.params.widgetId;

        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === wgid) {
                res.send( widget);
                return;
            }
        }
        res.send( null);
    }
    function updateWidget(req,res){

        var widget = req.body;
        var widgetId=req.params.widgetId;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {

                widgets[i].text=widget.text;
                widgets[i].name=widget.name;

                if(widget.widgetType=="HEADER"){
                    widgets[i].size=widget.size;
                }

                else if (widget.widgetType==="YOUTUBE" || widget.widgetType==="IMAGE"){
                    widgets[i].width=widget.width;
                    widgets[i].url=widget.url;
                }
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function createWidget(req,res){
        console.log("reached here");
        var newWidget = req.body;
        console.log("added widget "+newWidget);
        widgets.push(newWidget);
        console.log("all widgets after "+widgets);
        res.send(newWidget);
    }
    function deleteWidget(req,res){
        var widgetId=req.params.widgetId;

        for(var i in widgets){
            if(widgets[i]._id===widgetId){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);

    }
}
