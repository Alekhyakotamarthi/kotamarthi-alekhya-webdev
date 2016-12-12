
module.exports = function(app,model){

    userModel = model.userModel
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var session = require('express-session');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUnitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    var googleConfig = {
        clientID     : "514820574235-gcrqh2ptmq3ohbr7k8fmpp42834h2fnd.apps.googleusercontent.com",
        clientSecret : "dPjuI57vnqv8vsw11YRCWCy6",
        callbackURL  : "http://127.0.0.1:3000/auth/google/callback"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

                    app.get("/api/project/user",getUser);
                        app.get("/api/project/user/:userId",findUserById);
                app.post("/api/project/user",createUser);
             app.put("/api/project/:userId",loggedInAndSelf,updateUser);
             app.delete("/api/project/:userId",loggedInAndSelf,deleteUser);
            app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
                 app.post("/api/project/login",passport.authenticate('local') ,login);
                     app.post("/api/project/checkLogin",checkLogin);
                        app.put("/api/project/:userId/reviewandrating",updatereviewsandratings)
                     app.post("/api/project/checkAdmin",checkAdmin);
                 app.post("/api/project/logout",logout);
    app.put("/api/project/user/follows/:userId", followUser);
    app.put("/api/project/user/:userId/unfollows/:username", unfollowUser);
    app.get('/api/project/searchallusers', searchallusers);
                        app.get('/auth/google/callback',

        passport.authenticate('google', {
            successRedirect: '/project/client/index.html#/user',
            failureRedirect: '/project/client/index.html#/login'
        }));


    function updatereviewsandratings(req,res){

        var id = req.params.userId;
                var ratingandreview = req.body;

        userModel
                 .updatereviewsandratings(id, ratingandreview)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );

    }
    function loggedInAndSelf(req,res,next){
        var loggedin = req.isAuthenticated();
        var userId = req.params.userId;
        var self = userId == req.user._id;
        console.log(self);
        console.log("User is");
        console.log(userId);
        if(self&&loggedin){
            console.log("Same");
            next();
        }else {
            res.sendStatus(400).send("You are not the same person");
        }
    }

    function searchallusers(req,res)
    {
        userModel
            .searchallusers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );

    }
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function logout(req,res){
        req.logout();
        res.send(200);

    }
    function checkLogin(req,res){

        console.log("here in checklogin");
        res.send(req.isAuthenticated()? req.user: '0');
    }

    function checkAdmin(req,res){
        var loggedin = req.isAuthenticated();
        var isadmin = req.user.role == "ADMIN";
        if(loggedin&&isadmin) {
            res.send( req.user);
        }
        else{
            res.send('0');
        }
    }

    function localStrategy(username,password,done) {


        userModel.findUserByCredentials(username,password)
            .then(
                function (user) {
                    if(!user) {
                        return done(null, false);
                    }
                    return done(null,user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function serializeUser(user, done) {
        console.log("in serialize user");
        done(null,user);
    }

    function deserializeUser(user,done){
        console.log("in deserialize user");
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }



    function login(req,res){
        var user=req.user;
        res.json(user);

    }

    function createUser(req,res){
        var user=req.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        //console.log(user);
        //users.push(user);
        //res.send(user);
    }
    function getUser(req,res){
        var username =req.query['username'];
        var password =req.query['password'];

        if(username && password){
            findUserByCredentials(username,password,res);
        }
        else if (username){
            findUserByUsername(username, res);
        }
        else{
            res.send(req.user);
        }
    }
    function findUserByUsername(username,res){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            )
        //for(var i in users){
        //   if(users[i].username === username){
        //       res.send(users[i]);
        //      return;
        //  }
        // }
        //res.send(null);
    }
    function findUserByCredentials(username,password,res){

        userModel
            .findUserByCredentials(username,password)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            )
        // for(var i in users){
        //    if(users[i].username === username && users[i].password === password){

        //     res.send(users[i]);
        //   return;
        //}
        //}
        // res.send(null);

    }
    function findUserById(req,res){
        var id=req.params['userId'];
        userModel
            .findUserById(id)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            )

        //for(var i in users){
        //  if(users[i]._id === id){
        //      res.send(users[i]);
        //      return;
        //   }
        //}
        //res.send(null);
    }
    function updateUser(req,res){
        var updated_user = req.body;
        var userid=req.params.userId;

        console.log("here in server");
        console.log(userid);
        userModel
            .updateUser(userid,updated_user)
            .then(
                function(user){
                    console.log(user);
                    res.sendStatus(200);
                },
                function(error){
                    res.statusCode(404).send(error);
                }
            )
        // for (var value in users) {
        //    var obj = users[value];
        //   var id = obj._id;
        // if (id == userid) {
        //     users[value] = updated_user;
        //    res.send(users[value]);
        //     return;
        //  }
        // }
        // res.send(null);
    }

    function followUser(req, res) {
        var id = req.params.userId;
        var follows = req.body;

        userModel
            .followUser(id, follows)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function unfollowUser(req, res) {
        var id = req.params.userId;
        var username = req.params.username;

        console.log(id +" "+username);

        userModel
            .unfollowUser(id, username)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    function deleteUser(req,res){
        var id=req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(stats){

                    res.sendStatus(200);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            )

        //for(var i in users){
        //   if(users[i]._id == id){
        //      users.splice(i,1);
        //     res.send(200);
        //     return;
        //  }
        //}
        // res.send(400);
    }
};