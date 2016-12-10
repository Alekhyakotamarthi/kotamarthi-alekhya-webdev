/**
 * Created by Alekhya on 11/28/2016.
 */

module.exports = function() {

    //var mongoose = require('mongoose');
   // mongoose.connect('mongodb://localhost/cs5610fall');

   var models = {
                 userModel : require("./user/user.model.server.js") (),
                 movieModel : require("./movies/movie.model.server.js") (),
   };
   return models;
};
