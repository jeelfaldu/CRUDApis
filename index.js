//importing all modules//
var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = require('./Router/appRoutes');
//initialing app//
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router);


http.createServer(app).listen(process.env.PORT || 3000);
console.log("server started");