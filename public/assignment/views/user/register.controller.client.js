(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.createUser=createUser;

        function init(){

        }

                 function createUser(username,password,npassword) {

            UserService
                .findUserByUsername(username)
                .then(function(response){

                    var user=response.data;

                    if (user) {
                        vm.error="user already exists";
                    }

                    else
                    {
                        if(password===npassword){


                            var newUser={
                                _id:(new Date()).getTime()+"",
                                "firstName":username,
                                "lastName": username,
                                "username":username,
                                "password":password
                            };

                            UserService
                                .createUser(newUser)
                                .then(function(response){
                                    var success = response.data;

                                    if(success){
                                        $location.url("/user/"+newUser._id)
                                    }
                                    else{
                                        $location.url("/login");
                                    }
                                })
                        }

                        else{
                            vm.error="password dont match!!"}
                    }

                })


        }

    }

})();