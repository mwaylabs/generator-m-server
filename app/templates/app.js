var express = require('express');
var routes = require('./routes/index');
var overview = require('./routes/overview');
var app = express();

// Assign middlewares
app.use(express.bodyParser());
app.use('/', routes);
app.use('/overview', overview);

//starts express webserver
app.listen();
