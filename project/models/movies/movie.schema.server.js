/**
 * Created by Alekhya on 12/4/2016.
 */


module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var MovieSchema = mongoose.Schema({
                     tmdbId: String,
                     title: String,
                   poster_url: String,
                released: Date,
        // ids of ratings for this movie
                                 ratings: [
            {
                userId: String,
                username: String,
                value: Number
            }
        ],

                                 reviews: [
            {
                userId: String,
                username: String,
                text: String
            }
        ]

    }, {collection: 'project.movie'});
    return MovieSchema;
};