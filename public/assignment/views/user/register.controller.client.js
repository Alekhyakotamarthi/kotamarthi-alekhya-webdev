(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(username,password,vpassword){
            var checkDuplicate =UserService.findUserByUserName(username);
            if(checkDuplicate){
                vm.error = "User name already exists";
            }
            else{
                if(password===vpassword)
                {
                  var newUser ={
                      _id:(new Date).getTime()+"",
                      username: username,
                      password:password,
                      firstName:username,
                      lastName: username,
                  } ;

                  var result = UserService.createUser(newUser);
                    if(result){
                        $location.url("/user/"+newUser._id)
                    }
                    else{
                        $location.url("/login");
                    }
                }
                else{
                    vm.error="Passwords do not match";
                }
            }
        }

    }
})();
