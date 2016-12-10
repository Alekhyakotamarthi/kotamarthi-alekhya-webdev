/**
 * Created by Alekhya on 12/4/2016.
 */


// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);


}
