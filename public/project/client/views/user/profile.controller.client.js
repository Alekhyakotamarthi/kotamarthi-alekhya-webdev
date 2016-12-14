/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($location,$routeParams,UserService) {



        var vm=this;
        vm.updateUser=updateUser;
        vm.logout = logout;
        vm.deleteUser = deleteUser;


var userId = null;
        function init(){

                UserService
                    .findCurrentUser()
                    .success(function(response){
                        vm.user = response;
                        console.log(vm.user);
                        vm.userId = vm.user._id;
                        if(vm.user.reviews.length == 0){
                            vm.noreviews= true;
                        }
                        if(vm.user.ratings.length == 0){
                            vm.noratings= true;
                        }
                        if(vm.user.follows.length == 0){
                            vm.nofollowers= true;
                        }
                        if(vm.user.role == "ADMIN"){
                            vm.admin = true;
                            console.log("Set as admin");
                        }
                    });

            getLoggedInUser();

        }
        init();


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


        function updateUser(newUser) {
            console.log("check now",vm.userId);
            UserService.updateUser(vm.userId,newUser)

                .success(function(user){
                    console.log(user);
                    $location.url("/user/"+vm.user._id);

                });
        }

        function deleteUser(User) {
            UserService.deleteUser(User)
                .success(function(status){
                    console.log(status);
                    $location.url("/login");
                });
        }


    }

})();
