var mongoose=require("mongoose");
var bcrypt = require('bcryptjs');

var UserSchema=new mongoose.Schema({
    name:String,
    age:Number,
    bloodgrp:String,
    insurance:Number,
    phone:Number,
    history:String,
    password : String,
    emergencyContact:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
    }],
    
    emergencyContactFor:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	}],
});

module.exports=mongoose.model("user",UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}