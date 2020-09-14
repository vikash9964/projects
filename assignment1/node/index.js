require('./models/db');
const express = require('express');
 var bodyParser = require('body-parser');
 var cors = require('cors');
 var http = require('http');
var path = require('path');
var router = require('./routes/router');
var config = require('./config/config');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
require('dotenv').config();


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//console.log(config.app)
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(config.app.port, () => {
  console.log('Example app listening on port '+ config.app.port +'!')
});