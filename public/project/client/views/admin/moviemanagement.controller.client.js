/**
 * Created by Alekhya on 12/13/2016.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("MovieManagementController",MovieManagementController);

    function MovieManagementController(MyMovieService, $location, $sce, UserService, MovieService) {
        var vm = this;

        vm.updateMovie = updateMovie;
        vm.deleteMovie = deleteMovie;
        vm.logout = logout;

        function init() {
            getCurrentUser();
            findAllMovies();
        }
        init();

        function deleteMovie(tmdbId, userId) {
            MyMovieService
                .deleteMovie(tmdbId,userId)
                .then(function (response) {
                    findAllMovies();
                });
        }

        function updateMovie(tmdbId, userId, text) {
            var reviews = {
                userId: userId ,
                text : text,
                username : vm.username

            };

            MyMovieService
                .updateMovie(tmdbId, reviews)
                .then(function (response) {
                    var addedObject = response.data;
                    if(addedObject){
                        $location.url("/managemovies");
                    }else{
                        vm.error = "unable to add review";
                    }
                });


        }


        function findAllMovies() {
            MyMovieService
                .findAllMovies()
                .then(function (response) {
                    var allMovies = response.data;
                    var resultset=[];
                    for(var i in allMovies){
                        for(var j in allMovies[i].reviews){
                            allMovies[i].reviews[j].tmdbId = allMovies[i].tmdbId;
                            allMovies[i].reviews[j].title= allMovies[i].title;

                            resultset.push(allMovies[i].reviews[j]);
                        }
                    }

                    vm.results = resultset;
                    vm.moviesCount= resultset.length;

                    return resultset;


                });
        }

        function getCurrentUser() {
            UserService
            //.findUserById(vm.id)
                .findCurrentUser()
                .success(function (response) {
                    console.log("response is here");
                    console.log(response)
                    vm.user = response;
                    if (vm.user) {

                        vm.loggedIn = "true";
                        vm.loggedInUser = vm.user._id;
                        vm.username = vm.user.username;
                        console.log(vm.loggedInUser);

                    } else {
                        console.log("in else");
                        vm.notloggedIn = "true";

                    }
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

    }
})();
