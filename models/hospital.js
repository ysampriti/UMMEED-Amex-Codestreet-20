var mongoose=require("mongoose");

var UserSchema=new mongoose.Schema({
    name:String,
    freeBeds:Number,
    freeVentilators:Number,
    phone:Number,
});

module.exports=mongoose.model("hospital",HospitalSchema);