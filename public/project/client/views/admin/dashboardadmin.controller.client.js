/**
 * Created by Alekhya on 12/08/2016.
 */


(function () {
    angular
        .module("MovieApp")
        .controller("AdminDashboardController",AdminDashboardController);

    function AdminDashboardController(MovieService, $location, $sce, UserService) {
        var vm = this;

        vm.logout=logout;

        function init() {

            getLoggedInUser();
        }
        return init();

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
                .success(function(response){
                    vm.user = response;
                    console.log(vm.user);
                    vm.userId = vm.user._id;
            if(vm.user){
                vm.loggedIn = "true";
                loggedInUserId = vm.userId;

            } else {
                vm.notloggedIn = "true";

            }
        });
        }



    }
})();