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
        vm.deleteUser = deleteUser;
        vm.id=$routeParams.uid;
        function init() {
            UserService.findUserById(vm.id)
                .success(function(response){
                        vm.user = response;
                    console.log(vm.user);

                })

        }
        init();

        function updateUser(newUser) {

            UserService.updateUser(vm.id,newUser)
                .success(function(user){
                    console.log(vm.user);
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
