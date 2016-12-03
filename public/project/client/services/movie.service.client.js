/**
 * Created by Alekhya on 12/1/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService",MovieService);

    function MovieService($http){
        var api = {
            "searchMovieByTitle":searchMovieByTitle,
            "searchMovieByID":searchMovieByID,
        };
        return api;

        function searchMovieByTitle(title){
            var url = "http://www.omdbapi.com/?s="+title;
            return $http.get(url);

        }

        function searchMovieByID(imdbID){
            var url = "http://www.omdbapi.com/?i="+imdbID;
            return $http.get(url);

        }
    }
})();