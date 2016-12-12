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
            deleteUser: deleteUser,
            register: register,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            findCurrentUser:findCurrentUser,
                     checkAdmin:checkAdmin,
        };
        return api;

        function findUserByCredentials(username, password) {
            var url="/api/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function checkLogin(){
                      return $http.post("/api/checkLogin");
        }

        function login(username,password){
            var user ={
                username :username,
                password: password,
            }
            return $http.post("/api/login",user);
        }

                   function checkAdmin(){
                      return $http.post("/api/checkAdmin");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findCurrentUser(){

            var url = "/api/user";
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


                 function deleteUser(uid){
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