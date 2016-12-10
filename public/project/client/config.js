/**
 * Created by Alekhya on 11/30/2016.
 */
(function() {
    angular
        .module("MovieApp")
        .config(Configure);
    function Configure ($routeProvider) {
        console.log("in project config");
        $routeProvider

                   .when("/login", {
                templateUrl:"views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model"

            })
                   .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })

            .when("/user", {
                    templateUrl: "views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLogin: checkLogin
                    }
                }
            )

            .when("/admin", {
                    templateUrl: "views/admin/user-list.view.client.html",
                    controller: "UserListController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin:checkAdmin
                    }
                }
            )

            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }

            })
                 .when("/user/:uid/home", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/user/:uid/movie/:mid/:title", {

                    templateUrl: "views/movie/moviedetails.view.client.html",
                    controller: "MovieDetailsController",
                    controllerAs: "model"
                })
            .when("user/:uid/home/:title", {

                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
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

        function checkLogin($q,UserService,$location){
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function(user){
                        if(user!= '0'){
                            deferred.resolve();
                        }
                        else{
                            deferred.reject();
                            $location.url("/login");
                        }

                    }
                );
            return deferred.promise;

        }
        function checkAdmin($q,UserService,$location){
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function(user){
                        if(user!= '0'){
                            deferred.resolve();
                        }
                        else{
                            deferred.reject();
                            $location.url("/login");
                        }

                    }
                );
            return deferred.promise;

        }
    }
})();