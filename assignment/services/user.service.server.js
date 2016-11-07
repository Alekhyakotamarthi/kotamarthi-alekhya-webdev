module.exports = function(app){
  var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    function createUser(req,res){
        var user=req.body;
        console.log(user);
        users.push(user);
        res.send(user);
    }
    function getUsers(req,res){
        var username =req.query['username'];
        var password =req.query['password'];

        if(username && password){
            findUserByCredentials(username,password,res);
        }
        else if (username){
            findUserByUsername(username, res);
        }
        else{
            res.send(users);
        }
    }
    function findUserByUsername(username,res){
        for(var i in users){
            if(users[i].username === username){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }
    function findUserByCredentials(username,password,res){

        for(var i in users){
            if(users[i].username === username && users[i].password === password){

                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }
    function findUserById(req,res){
        var id=req.params['userId'];
        for(var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }
    function updateUser(req,res){
        var updated_user = req.body;
        var userid=req.params.userId;
        for (var value in users) {
            var obj = users[value];
            var id = obj._id;
            if (id == userid) {
                users[value] = updated_user;
                res.send(users[value]);
                return;
            }
        }
        res.send(null);
    }
    function deleteUser(req,res){
        var id=req.params.userId;

        for(var i in users){
            if(users[i]._id == id){
                users.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
};