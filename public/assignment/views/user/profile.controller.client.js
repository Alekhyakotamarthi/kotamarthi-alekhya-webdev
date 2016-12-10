/**
 * Created by Alekhya on 10/20/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);


    function ProfileController($location,$routeParams,UserService) {

        var vm=this;
        vm.updateUser=updateUser;
                    vm.logout = logout;
        vm.deleteUser = deleteUser;
                 // vm.id=$routeParams.uid;
        function init() {
            UserService
                //.findUserById(vm.id)
                .findCurrentUser()
                .success(function(response){
                        vm.user = response;
                        vm.id = vm.user._id;
                    console.log(vm.id);
                    console.log("here in controller");
                    console.log(vm.id);

                })

        }
        init();

        function logout(){
            UserService.logout()
                .success(function(){
                   $location.url("/login") ;
                });
        }

        function updateUser(newUser) {
            console.log("check now",vm.id);
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
