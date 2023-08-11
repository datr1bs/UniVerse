/* eslint-disable linebreak-style */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mysql = require('mysql2');
var nodemailer = require('nodemailer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dbConnectionPool = mysql.createPool({
    host: '127.0.0.1',
    database: 'wdc'
});

var app = express();

app.set('view-engine', 'ejs');

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'Red_devils',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: set "secure: true" if using HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;
