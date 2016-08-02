var express = require('express');
// var bodyParser = require('body-parser');

var app = express();
var CONFIG = require('config').BASE;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
    if(req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
}

app.port = CONFIG.PORT;

// app.use(bodyParser.urlencoded({
//     extended: false
// })); 
app.use(allowCrossDomain);

var routes = require('./routes');

routes(app);

module.exports = app