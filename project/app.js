/**
 * Created by Alekhya on 10/31/2016.
 */

module.exports = function(app) {

   var models = require("./models/models.server")();
               require("./services/user.service.server.js")(app,models);
                require("./services/movie.service.server.js")(app,models);
};
