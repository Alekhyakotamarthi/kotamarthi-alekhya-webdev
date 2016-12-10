(function () {
    angular
                        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService) {
                    var vm =this;
                    vm.login= function(username,password){
                        //var promise =  UserService.findUserByCredentials(username,password)
                        var promise =  UserService.login(username,password)
                        promise
                            .success(function(user)
                        {
                            if(user==='0')
                            {
                                vm.error("User not found");
                            }
                            else
                            {
                                console.log(user);

                                $location.url("/user/"+user._id);
                            }

                        })
                            .error(function()
                            {

                            })
                    }


    }
})();
