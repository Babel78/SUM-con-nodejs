var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy= require('passport-local').Strategy;
var User= require('../models/user');
mongoose.connect("mongodb://localhost:27017/dbp1",(err,res)=>{
    if(err) console.log(`Error al conectar a la base de datos ${err.message}`);
    else console.log("Conectado a la base de datos");
});

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('login');
});

router.get('/form',(req,res)=>{
  res.render('form');
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.post('/register',(req,res)=>{
  var params=req.body;
  var user=new User({
    name:params.name,
    lastname:params.lastname,
    email:params.email,
    username:params.username,
    password:params.password
  });
  user.save((err,userUpdate)=>{
      if(err){
          console.log(`Error al guardar el usuario en la base de datos ${err.message}`);
          res.status(500).send({message:"Error al guardar el usuario en la base de datos"});
      }
      else{
        console.log("Usuario guardado con exito!");
        res.render('form');
      } 
  });  
});

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
passport.use(new Strategy(
  (username,password,cb)=>{
    User.findOne({username:username},(err,user)=>{
      if(err) {return cb(err);}
      if(!user){return cb(null,false);}
      if(user.password!=password){return cb(null,false);}
      return cb(null,user);
    })
  }));
router.post('/login',passport.authenticate('local', { failureRedirect: '/users'}),(req, res)=> {
  res.render('user_dates',{user:req.user});
});

router.get('/logout',(req,res)=>{
  req.session.destroy(err=>{
    if(err) console.log(err.message);
    res.render('index');
  });
});
module.exports = router;
