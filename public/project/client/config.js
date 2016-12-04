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
            .when("/user/:uid/home", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/movie/:mid/:title", {

                    templateUrl: "views/movie/moviedetails.view.client.html",
                    controller: "MovieDetailsController",
                    controllerAs: "model"
                })
            .when("user/:uid/home/:title", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {

                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {

                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {

                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();