var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var index = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport');
var User= require('./models/user');
const port=process.env.port || 3000;
var app = express();
//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use('/', index);
app.use('/users', users);

app.listen(port,()=>{
  console.log('====================================');
  console.log(`Escuchando desde el puerto: ${port}`);
  console.log('====================================');
});




