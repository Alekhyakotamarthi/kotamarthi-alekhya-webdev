/**
 * Created by Alekhya on 12/1/2016.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController(MovieService,$routeParams,$sce) {
        console.log("in controller");
        var vm =this;
        function init() {
            var imdbID = $routeParams.mid;

            vm.title = $routeParams.title;
            MovieService.searchMovieByID(imdbID)
                .success(function(response){

                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                        response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    vm.movie = response;

                });
        }
        init();
    }
}());
