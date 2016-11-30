/**
 * Created by Alekhya on 11/6/2016.
 */

module.exports = function(app,models){
    var websiteModel = models.websiteModel;
/*
    var websites=[

        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }

    ];*/
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website",createWebsite);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    function findAllWebsitesForUser(req,res){
                    var id=req.params.userId;
                 console.log(id);
                 websiteModel
                     .findAllWebsitesForUser(id)
                     .then(
                         function(websites){
                             console.log(websites)
                             res.json(websites);
                         }
                     );

       // var result = [];
       // for(var w in websites){
         //   var website=websites[w];
          //  if(id === website.developerId){
          //      result.push(website);
          //      console.log(website);
         //   }
       // }
       // res.send(result);
    }
    function findWebsiteById(req,res){
        var wid=req.params.websiteId;

        websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    console.log(website)
                    res.json(website);
                }
            );
       // for(var w in websites){
        //    var website=websites[w];
        //    if(website._id === wid){
        //        res.send (website);
         //       return;
       //     }
      //  }
       // res.send(null);
    }

    function createWebsite(req,res) {
        var website = req.body;
        console.log(website);
        var userId = req.params.uid;
        websiteModel
            .createWebsite(userId,website)
            .then(
                function(website){
                    res.json(website);
                }
            );
        //console.log(website);
       // websites.push(website);
       // res.send(website);

    }

    function updateWebsite(req,res){
        console.log("in server");
        var website = req.body;
        var wid=req.params.websiteId;
        websiteModel
            .updateWebsite(wid,website)
            .then(
                function(website){
                    res.send(200);
                }
            );

       // for(var w in websites){
        //    if(websites[w]._id === wid){
        //        websites[w].name=website.name;
         //       websites[w].description=website.description;
         //       console.log("ckeck name  "+websites[w].name);
         //       console.log("ckeck desc  "+websites[w].description);
         //       res.send(websites[w]);
         //       return;
          //  }
       // }

       // res.send(400);
    }
    function deleteWebsite(req,res){

        console.log("in server");
        var wid=req.params.websiteId;
        websiteModel
            .deleteWebsite(wid)
            .then(
                function(website){
                    res.send(200);
                }
            );
        //var wid = req.params.websiteId;
        //for(var w in websites){
         //   if(wid === websites[w]._id){
         //       websites.splice(w, 1);
           //     res.send(200);
          //      return;
        //   }
       // }
       // res.send(400);
    }
};
