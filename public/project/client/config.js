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

            .when("/user/profile/:username", {
                    templateUrl: "views/user/viewanotherprofile.view.client.html",
                    controller: "FollowController",
                    controllerAs: "model",
                    resolve: {
                        checkLogin: checkLogin
                    }
                }


            )

            .when("/admin", {
                    templateUrl: "views/admin/dashboardadmin.view.client.html",
                    controller: "AdminDashboardController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin:checkAdmin
                    }
                }
            )

            .when("/admin/usermanagement", {
                    templateUrl: "views/admin/usermanagement.view.client.html",
                    controller: "UserManagementController",
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

            .when("#/dashboardadmin",{

                templateUrl: "views/admin/dashboardadmin.view.client.html",
                controller: "AdminDashboardController",
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

            .otherwise({
                redirectTo: "/login"
            });

        function checkLogin($q,UserService,$location){
            var deferred = $q.defer();
            console.log("I am here")
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