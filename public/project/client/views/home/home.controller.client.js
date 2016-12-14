/**
 * Created by Alekhya on 11/30/2016.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService,UserService,$routeParams,$location) {
        console.log("in controller");
        var vm =this;
        vm.uid = $routeParams.uid;
        vm.searchMovieByTitle = searchMovieByTitle;

        vm.title = $routeParams.title;
        function init(){

            UserService
            //.findUserById(vm.id)
                .findCurrentUser()
                .success(function (response) {
                    console.log("response is here");
                    console.log(response)
                    vm.user1 = response;
                    if (vm.user1) {

                        vm.loggedIn = "true";
                        vm.loggedInUser = vm.user1._id;
                        console.log(vm.loggedInUser);

                    } else {
                        console.log("in else");
                        vm.notloggedIn = "true";

                    }
                });
           if(vm.title){
               $location.path("/home/"+vm.title);
               searchMovieByTitle(vm.title);
           }
           MovieService.findNowPlaying()
               .success(function(result){
                   vm.nowplayingmovies = result.results;
               })

            MovieService.findPopularMovies()
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
