/**
 * Created by Alekhya on 11/30/2016.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService,$routeParams,$location) {
        console.log("in controller");
        var vm =this;
        vm.searchMovieByTitle = searchMovieByTitle;

        vm.title = $routeParams.title;
        function init(){
           if(vm.title){
               $location.path("/home/"+vm.title);
               searchMovieByTitle(vm.title);
           }
           MovieService.findNowPlaying()
               .success(function(result){
                   vm.movies = result.results;
               })
        }
        init();

        function searchMovieByTitle(title){
            console.log(vm.title);
            var url = "http://omdbapi.com/?s="+vm.title;
            MovieService.searchMovieByTitle(vm.title)
                .success(function(result){

                    vm.movies = result.results;
                    console.log(vm.movies);
                });

        }

    }
}());
