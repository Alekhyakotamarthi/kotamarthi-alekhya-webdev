var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString ='mongodb://alekhya:Portal20@ds033337.mongolab.com:33337/webdev';
var mongoose = require("mongoose");
mongoose.connect(connectionString);

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var assignment=require("./assignment/app");
var project=require("./project/app");
            //project(app);
            assignment(app);
app.listen(3000);