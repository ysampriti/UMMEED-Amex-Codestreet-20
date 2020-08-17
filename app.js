var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var cookieParser          = require('cookie-parser');
var session               = require('express-session');
var Hospital              = require("./models/hospital")
var User                  = require('./models/user')
var passport              = require('passport');
mongoose.connect("mongodb+srv://Avinash:Avinash@1@cluster0.pqqse.mongodb.net/db?retryWrites=true&w=majority",{useNewUrlParser:true});

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Register User
app.post('/register', function(req, res){
    console.log(req.body);
    var users = new User({
        name: req.body.name,
        bloodgrp:  req.body.bloodgrp,
        insurance:  req.body.insurance,
        age:  req.body.age,
        phone:  req.body.phone,
        history:  req.body.history,
        emergencyContact:[],
        emergencyContactFor:[],
        password: req.body.password
      })
    User.createUser(users, function(err, user){
      if(err) throw err;
      User.create(user,function(err,newUser){
	    	if(err){
	            console.log(err);
	    		return res.status(500);
	        }
	        console.log(newUser);
	    	res.status(200).send(newUser).end()
	    });
    });
    

});


app.listen(3000, function(){
    console.log("The Server Has Started!");
 });
