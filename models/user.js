var mongoose=require("mongoose");

var UserSchema=new mongoose.Schema({
    name:String,
    age:Number,
    bloodgrp:String,
    insurance:Number,
    phone:Number,
    history:String,
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