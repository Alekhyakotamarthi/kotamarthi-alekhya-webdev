/**
 * Created by Alekhya on 11/6/2016.
 */

module.exports = function(app,models){

    var pageModel = models.pageModel;

    /*
    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];
    */
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.post("/api/website/:websiteId/page",createPage);
    app.delete("/api/page/:pageId",deletePage);
    function findAllPagesForWebsite(req,res){
        var wid=req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages){
                    console.log(pages)
                    res.json(pages);
                }
            );

       /* var resultset=[];
        for(var p in pages){
        if(pages[p].websiteId===wid){
                resultset.push(pages[p]);
            }
        }

        res.send( resultset);
        */
    }
    function findPageById(req,res){
        var pid=req.params.pageId;
        pageModel
            .findPageById(pid)
            .then(
                function(page){

                    res.json(page);
                }
            );
        /*
        for(var p in pages){
            if(pages[p]._id===pid){
                res.send( pages[p]);
                return;
            }
        }
        res.send( null);*/
    }
    function updatePage(req,res){
        var new_page = req.body;
        var pid=req.params.pageId;
        pageModel
            .updatePage(pid,new_page)
            .then(
                function(page){
                    res.send(200);
                }
            );
    /*
        for(var p in pages){
            if(pages[p]._id===pid){
                pages[p].name=new_page.name;
                pages[p].description=new_page.description;
                pages[p].websiteId=new_page.websiteId;
                res.send(200);
                return;
            }
        }
        res.send(400);
        */
    }
    function createPage(req,res){
        var new_page = req.body;
        var wid=req.params.websiteId;
        pageModel
            .createPage(wid,new_page)
            .then(
                function(page){
                    console.log(page)
                    res.json(new_page);
                }
            );
        /*

        pages.push(new_page);
        res.send( new_page);
        return;
        */
    }
    function deletePage(req,res){
        var pid=req.params.pageId;
        pageModel
            .deletePage(pid)
            .then(
                function(page){
                    res.send(200);
                }
            );
        /*
        for(var p in pages){
            if(pages[p]._id===pid){
                pages.splice(p,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
        */
    }
}
