// use 'npm install express'

var express = require('express');
var app = express();

// connect mongoose to DB (local database named web-app-maker)
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost/web-app-maker');

// load passport module
var passport = require('passport');

// load cookie parser
var cookieParser = require('cookie-parser');

//load session support
var session = require('express-session');

// install, load, and configure body parser module
var bodyParser = require('body-parser');

// turn on bodyParser's json parser
app.use(bodyParser.json());
// also tell the parser that the data will be URL encoded
app.use(bodyParser.urlencoded({extended: true}));


// configure cookie parser - needed for oauth
app.use(cookieParser());

// configure session support
app.use(session({secret: 'meanstackisthebest'}));

// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./app/app.js")(app, db);

app.listen(3000);