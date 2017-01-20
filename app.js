require('dotenv').config();
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('./models/jwt');
//==============================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var customers = require('./routes/customers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

let dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  insecureAuth: true
});

dbPool.on('connection', (connection) => {
  connection.query('SET NAMES utf8');
});

let dbPool2 = mysql.createPool({
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_NAME,
  port: process.env.DB2_PORT
});

dbPool2.on('connection', (connection) => {
  connection.query('SET NAMES utf8');
});

app.use((req, res, next) => {
  req.db = dbPool;
  req.db2 = dbPool2;
  next();
});

let authToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  // console.log(req.headers);
  jwt.verify(token)
    .then((decoded) => {
      req.decoded = decoded;
      console.log(req.decoded);
      next();
    }, err => {
      return res.send({
        ok: false,
        error: 'No token provided.',
        code: 403
      });
    });
}

app.use('/users', users);
app.use('/customers', authToken, customers);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
