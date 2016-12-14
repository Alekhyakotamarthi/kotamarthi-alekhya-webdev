/**
 * Created by Alekhya on 12/09/2016.
 */


(function () {
    angular
        .module("MovieApp")
        .controller("UserManagementController", UserManagementController);

    function UserManagementController(MovieService, $location, $sce, UserService, MyMovieService) {
        var vm = this;


        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            getLoggedInUser();
            SearchAllUsers();
        }

        init();


        function createUser(username, password, admin) {
            var user = {
                username: username,
                password: password,
                role: admin
            };

            UserService
                .createUser(user)
                .then(
                    function (response) {
                        vm.createsuccess = "Created UserSuccessfully";

                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                )
        }

        function deleteUser(userId) {
            UserService
                .deleteUser2(userId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                )
        }

        function updateUser(userId, user) {


            UserService
                .updateUser2(userId, user)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                );
        }


        function SearchAllUsers() {
            UserService
                .SearchAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                    vm.userCount = vm.users.length;

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

        function getLoggedInUser() {
            UserService
                .findCurrentUser()
                .success(function (response) {
                    vm.user = response;
                    console.log(vm.user);
                    vm.userId = vm.user._id;
                    if (vm.user) {
                        vm.loggedIn = "true";
                        loggedInUserId = vm.userId;

                    } else {
                        vm.notloggedIn = "true";

                    }

                })
        }
    }
})();
