/**
 * Created by Alekhya on 10/19/2016.
 */

(function(){
    angular
        .module("MovieApp")
        .factory("UserService",UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUser: deleteUser,
        };
        return api;

        function findUserByCredentials(username, password) {
            var url="/api/project/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url);
        }
        function findUserByUsername(uname) {

            var url = "/api/project/user?username="+uname;
            return $http.get(url);
        }


        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url,user);

        }

                 function deleteUser(uid){
            console.log("at client server"+uid);
            var url = "/api/project/user/"+uid;
            return $http.delete(url);
        }

        function updateUser(userId, user) {

                     var url ="/api/project/user/"+userId;
                     return $http.put(url,user);

        }
    }
})();