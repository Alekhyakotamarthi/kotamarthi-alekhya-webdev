/**
 * Created by Alekhya on 11/29/2016.
 */

module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
                 username: {type: String, required: true},
                     password :String,
                    firstName: String,
                    lastName: String,
                    dob: Date,
                     email: String,
                        role: {type:String, enum: ['ADMIN','STUDENT','FACULTY']},
                     dateCreated: {type: Date, default: Date.now},
                    google:{
                         id: String,
                        email : String,

                    },

    },{collection: "assignment.user"});

    return UserSchema;

};