/**
 * Created by Alekhya on 12/4/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server.js")();

    var Movie  = mongoose.model("Movie", MovieSchema);


    var api = {
        updateRatingAndReview : updateRatingAndReview,
        createMovie: createMovie,
        findMovieById : findMovieById,
        findAllMovies: findAllMovies

    };
    return api;


    function findMovieById(id) {

        return Movie.find({tmdbId: id});
    }

    function findAllMovies() {
        return Movie.find();
    }





    function createMovie(movie) {
        return Movie.create(movie);
    }

    function updateRatingAndReview(id, ratingsandreviews) {
        var ratings = ratingsandreviews.ratings;
        var reviews = ratingsandreviews.reviews;


        console.log( "in update rating and review");
        console.log(ratings);
        console.log(reviews);
        return Movie
            .update({tmdbId: id},
                {$push: {ratings: ratings,
                    reviews: reviews}}
            );
    }



}
