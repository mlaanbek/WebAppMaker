// use 'npm install express'

var express = require('express');
var app = express();

// connect mongoose to DB (local database named web-app-maker)
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost/web-app-maker');

app.listen(3000);