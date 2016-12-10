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
                     email: String,
                 role: {type: String, enum: ['ENDUSER', 'ADMIN']},
            dateCreated: {type: Date, default: Date.now},
                 google: {
                     id:    String,
                     token: String
                         },
                   ratings: [
                   {
                name: String,
                tmdbId: String,
                rating: Number,
                poster_url: String
                   }
                  ],

        reviews: [
            {
                name: String,
                tmdbId: String,
                review: String,
                poster_url: String
            }
        ],
        //
        follows: [
            {
                userId: String,
                username: String

            }

        ],

            followedby: [
                {
                    userId: String,
                    username: String,
                }
            ]
             }

             , {collection: 'project.user'});
    return UserSchema;
};