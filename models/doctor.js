var mongoose=require("mongoose");

var DoctorSchema=new mongoose.Schema({
    name:String,
    age:Number,
    department:String,
    address:String,
    experience:Number,
    WorksAt:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'hospital'
	},
	qualifification:String,
	phone:Number
});

module.exports=mongoose.model("doctor",DoctorSchema);