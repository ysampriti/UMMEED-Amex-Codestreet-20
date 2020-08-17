var express               = require("express");
var app                   = express();
var bodyparser            = require("body-parser");
var mongoose              = require("mongoose");
var Hospital              = require("./models/hospital")

mongoose.connect("mongodb+srv://Avinash:Avinash@1@cluster0.pqqse.mongodb.net/db?retryWrites=true&w=majority",{useNewUrlParser:true});

app.get("*",function(req,res){
    res.send("landing page");
});

app.listen(3000, function(){
    console.log(process.env,"The Server Has Started!");
 });
 