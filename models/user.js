'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    name: {type:String,required:true},
    lastname:{type: String,required:true},
    email:{type:String, required:true},
    username:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    date_register:{type:Date , default:Date.now}
});

var User = mongoose.model("User", user_schema);
module.exports= User;