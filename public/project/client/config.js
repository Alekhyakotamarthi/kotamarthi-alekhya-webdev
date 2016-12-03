/**
 * Created by Alekhya on 11/30/2016.
 */
(function() {
    angular
        .module("MovieApp")
        .config(Configure);
    function Configure ($routeProvider) {
        console.log("in config");
        $routeProvider
            .when("/home", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/movie/:mid/:title", {

                    templateUrl: "views/movie/moviedetails.view.client.html",
                    controller: "MovieDetailsController",
                    controllerAs: "model"
                })
            .when("/home/:title", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();