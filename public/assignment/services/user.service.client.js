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
            UnregisterUser: UnregisterUser
            /* deleteUserById: deleteUserById*/



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
            /*for (var u in users) {
             var user = users[u];
             if (user.username === uname) {
             return true;
             }
             }
             return false;*/
        }


        function createUser(user) {
            var url = "/api/user";

            return $http.post(url,user);

            /* var new_user = user;
             users.push(new_user);
             return new_user;*/

        }


        function UnregisterUser(uid){
            console.log("at client server"+uid);
            var url = "/api/user/"+uid;
            return $http.delete(url);
        }


        /*function deleteUserById(userId) {

         for (var index in users) {
         var obj = users[index];
         if (obj._id == userId) {
         users.splice(index, 1);
         return true;
         }
         }
         return false;
         }*/

        function updateUser(userId, user) {

            var url ="/api/user/"+userId;
            return $http.put(url,user);
            /*for (var value in users) {
             var obj = users[value];
             var id = obj._id;
             if (id == userid) {
             users[value] = user;
             return user;

             }

             }*/

        }
    }
})();