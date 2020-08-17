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
  saveUninitialized: false,
  resave: false
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Register User
app.post('/register', function(req, res){
    console.log(req.body);
    var users = new User({
        name:       req.body.name,
        bloodgrp:   req.body.bloodgrp,
        insurance:  req.body.insurance,
        age:        req.body.age,
        phone:      req.body.phone,
        history:    req.body.history,
        emergencyContact:[],
        emergencyContactFor:[],
        password:  req.body.password
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

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
	usernameField : 'phone',
	passwordField : 'password'
 	},
  function(phone, password, done) {
    User.getUserByPhone(phone, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     		console.log('MONIL');
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.phone);
});

passport.deserializeUser(function(phone, done) {
  User.getUserByPhone(phone, function(err, user) {
    done(err, user);
  });
});

// Endpoint to login
app.post('/login', passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
  }
);

// Endpoint to get current user
app.get('/user', function(req, res){
	console.log(req.user);
  	res.send(req.user).end();
})


// Endpoint to logout
app.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});

app.get('/',function(req,res){
  Hospital.find({},function(err,hospitals){
		if(err)
		{
			console.log(err);
			res.send("null");
		}
		else res.send(hospitals);
		});
})

app.listen(3000, function(){
    console.log("The Server Has Started!");
 });
