/**
 * Created by Alekhya on 11/28/2016.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
             var User = mongoose.model("User",UserSchema);
    var api = {
        createUser : createUser,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser,

    };

    return api;

     function findUserById(userId){
      return User.findById(userId)
     }
     function findUserByUsername(username){
         return User.findOne({username:username})
     }
     function findUserByCredentials(username,password){
         return User.findOne({username: username,password:password})
     }
     function deleteUser(userId){
         return User.remove({_id:userId});
     }
    function createUser(user){
        console.log("user.model.server.createUser()")
        console.log(user);
        return User.create(user);
    }
    function updateUser(userId,newuser)
    {
                 return User.update({_id:userId},{$set:{firstName:newuser.firstName,
                                                lastName:newuser.lastName}});
    }
};
