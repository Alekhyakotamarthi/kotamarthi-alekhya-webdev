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
                    vm.user = user;
                    console.log(vm.user);
                });
        }


    }

})();
