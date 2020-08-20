var mongoose=require("mongoose");
var bcrypt = require('bcryptjs');

var StaffSchema=new mongoose.Schema({
    name:String,
    age:Number,
    phone:Number,
    password : String,
    worksAt:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'hospital'
    }
});

var Staff = module.exports=mongoose.model("staff",StaffSchema);

module.exports.createStaff = function(newStaff, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newStaff.password, salt, function(err, hash) {
      newStaff.password = hash;
      newStaff.save(callback);
    });
  });
}

module.exports.getStaffByPhone = function(phone, callback){
  var query = {phone: phone};
  Staff.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}