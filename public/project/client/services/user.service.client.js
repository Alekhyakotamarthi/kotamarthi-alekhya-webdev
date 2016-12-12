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
            SearchAllUsers:SearchAllUsers,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            followUser:followUser,
            unfollowUser:unfollowUser,
            findCurrentUser:findCurrentUser,
                    submitReviewandRating:submitReviewandRating,
            checkAdmin:checkAdmin,
        };
        return api;

        function findUserByCredentials(username, password) {
            var url="/api/project/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function SearchAllUsers(){

            var url = "/api/project/searchallusers";
            return $http.get(url);

        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function checkLogin(){

            console.log("checking logon")
            return $http.post("/api/project/checkLogin");
        }

        function login(username,password){
            var user ={
                username :username,
                password: password,
            }
            return $http.post("/api/project/login",user);
        }

        function checkAdmin(){
            return $http.post("/api/project/checkAdmin");
        }

        function findCurrentUser(){

            var url = "/api/project/user";
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

                    function  submitReviewandRating(userId,reviewandrating){
                console.log(userId);
                console.log(reviewandrating);
                  var url = "/api/project/"+userId+"/reviewandrating";
                        return $http.put(url,reviewandrating)

        }

        function followUser(userId, follows) {
            var url = "/api/project/user/follows/"+ userId;
            return $http.put(url, follows);
        }

        function unfollowUser(userId, username) {
            var url = "/api/project/user/"+ userId+"/unfollows/" +username;
            return $http.put(url);
        }
    }
})();