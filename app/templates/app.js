'use strict';

var express = require('express');
var routes = require('./routes/index');
var overview = require('./routes/overview');
var app = express();
//build::require

// Assign middlewares
app.use(express.bodyParser());
app.use('/', routes);
app.use('/overview', overview);
//build::middleware

//starts express webserver
app.listen();
