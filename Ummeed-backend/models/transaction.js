var mongoose=require("mongoose");
var bcrypt = require('bcryptjs');

var TransactionSchema=new mongoose.Schema({
    name:String,
    age:Number,
    bloodgrp:String,
    insurance:Number,
    phone:Number,
    history:String,
    hospital : String,
    whatHappened : String
});

var Transaction = module.exports=mongoose.model("transaction",TransactionSchema);


module.exports.getTransactionByPhone = function(phone, callback){
  var query = {phone: phone};
  User.findOne(query, callback);
}

module.exports.getTransactionByHospital = function(hospital, callback){
  var query = {hospital: hospital};
  User.findOne(query, callback);
}

