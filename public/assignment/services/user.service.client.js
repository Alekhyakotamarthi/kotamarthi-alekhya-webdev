/**
 * Created by Alekhya on 10/19/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            UnregisterUser: UnregisterUser,
        };
        return api;

        function findUserByCredentials(username, password) {
            var url="/api/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }
        function findUserByUsername(uname) {

            var url = "/api/user?username="+uname;
            return $http.get(url);
        }


        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);

        }


        function UnregisterUser(uid){
            console.log("at client server"+uid);
            var url = "/api/user/"+uid;
            return $http.delete(url);
        }

        function updateUser(userId, user) {

            var url ="/api/user/"+userId;
            return $http.put(url,user);

        }
    }
})();