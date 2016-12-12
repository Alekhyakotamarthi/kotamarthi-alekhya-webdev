/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("FollowController",FollowController);


    function FollowController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        var username = $routeParams.username;
        console.log(username);
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.loggedInUser = null;
        // var loggedInUserId = $rootScope.currentUser._id;

        function init() {

            UserService
            //.findUserById(vm.id)
                .findCurrentUser()
                .success(function (response) {
                    console.log("response is here")
                    console.log(response)
                    vm.user1 = response;
                    if (vm.user1) {

                        vm.loggedIn = "true";
                        vm.loggedInUser = vm.user1._id;
                        console.log(vm.loggedInUser);

                        lreadyFollowing(vm);

                    } else {
                        vm.notloggedIn = "true";

                    }
                });

            findUserByUsername(username);


        }

        return init();


        function unfollowUser() {
            UserService
                .unfollowUser(vm.loggedInUser, username)
                .then(function (res) {
                    var unfollow = res.data;
                    if (unfollow) {
                        vm.unfollow = "you are now unfollowing the user";

                    } else {
                        vm.error = "Something is wrong! you can follow this user"
                    }
                });
        }

        function followUser() {

            UserService
                .findUserById(vm.loggedInUser)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    for (var i in userFollows) {
                        if (userFollows[i].username == username) {
                            vm.error = "Dear user, you are already following this user!";
                            return;
                        }
                    }


                    UserService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var returnedUser = response.data;
                            var userId = returnedUser._id;
                            var follows = {
                                userId: userId,
                                username: username
                            };

                            UserService
                                .followUser(vm.loggedInUser, follows)
                                .then(function (res) {
                                    var newUser = res.data;

                                    if (newUser) {
                                        vm.success = "you are now following the user";

                                    } else {
                                        vm.error = "Something is wrong! you can follow this user"
                                    }
                                });
                        });

                });
        }


        function findUserByUsername(username) {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.user = response.data;
                    console.log(vm.user);
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


        function lreadyFollowing() {

            console.log(vm.loggedInUser);
            UserService
                .findUserById(vm.loggedInUser)
                .then(function (response) {
                    console.log("response from find userbyId");
                    console.log(response.data);
                    var userFollows = response.data.follows;
                    for (var i in userFollows) {
                        if (userFollows[i].username == username) {
                            vm.following = "true";
                            return;
                        }
                    }
                    vm.notfollowing = "true";

                });
        }

    }

})();
