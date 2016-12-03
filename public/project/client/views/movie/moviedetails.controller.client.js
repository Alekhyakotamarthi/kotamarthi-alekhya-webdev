/**
 * Created by Alekhya on 12/1/2016.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController(MovieService,$routeParams) {
        console.log("in controller");
        var vm =this;
        function init() {
            var imdbID = $routeParams.mid;

            vm.title = $routeParams.title;
            MovieService.searchMovieByID(imdbID)
                .success(function(result){
                    vm.movie = result;
                    console.log(vm.movie);
                });
        }
        init();
    }
}());
