var mongoose=require("mongoose");

var HospitalSchema=new mongoose.Schema({
    name:String,
    freeBeds:Number,
    freeVentilators:Number,
    phone:Number,
});

module.exports=mongoose.model("hospital",HospitalSchema);