var mongoose=require("mongoose");

var HospitalSchema=new mongoose.Schema({
    name:String,
    freeBeds:Number,
    freeVentilators:Number,
    phone:Number,
});

var Hospital = module.exports=mongoose.model("hospital",HospitalSchema);


module.exports.findById = function(id, callback){
  var query = {_id: id};
  Hospital.findOne(query, callback);
}