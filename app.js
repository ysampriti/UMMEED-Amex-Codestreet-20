var express               = require("express");
var app                   = express();
var bodyparser            = require("body-parser");
var mongoose              = require("mongoose");

app.get("*",function(req,res){
    res.send("testing");
});

app.listen(3000, function(){
    console.log(process.env,"The Server Has Started!");
 });
 