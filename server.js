'use strict';
// BASE SETUP
// ==============================================
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = __dirname + '/build/';
var bodyparser = require('body-parser');
// ROUTES
// ==============================================
// get an instance of router
var router = express.Router();

// apply the routes to our application
app.use(bodyparser.json());
app.use('/', router);
app.use(express.static(path));

// route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

//load the static webpage http file.
router.get('/', function(req, res) {
  res.sendFile(path + 'index.html');
});

//post route.
require('./routes/postmmm')(app);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('server started on ' + port);
