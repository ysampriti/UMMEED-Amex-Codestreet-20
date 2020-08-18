var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var cookieParser          = require('cookie-parser');
var session               = require('express-session');
var Hospital              = require("./models/hospital")
var User                  = require('./models/user')
var Staff                  = require('./models/hospitalStaff')
var passport              = require('passport');
var passport2             = require('passport');
mongoose.connect("mongodb+srv://Avinash:Avinash@1@cluster0.pqqse.mongodb.net/db?retryWrites=true&w=majority",{useNewUrlParser:true});

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var main =  express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cookieParser());


//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

main.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
main.use(passport2.initialize());
main.use(passport2.session());

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

main.post('/register', function(req, res){
    console.log(req.body);
    console.log("ASDAD");
    var users = new Staff({
        name:       req.body.name,
        hospital :  req.body.hospital,
        age:        req.body.age,
        phone:      req.body.phone,
        password:  req.body.password
      })
    Staff.createStaff(users, function(err, user){
      if(err) throw err;
      Staff.create(user,function(err,newUser){
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

var LocalStrategy2 = require('passport-local').Strategy;
passport2.use(new LocalStrategy2({
	usernameField : 'phone',
	passwordField : 'password'
 	},
  function(phone, password, done) {
    Staff.getStaffByPhone(phone, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      Staff.comparePassword(password, user.password, function(err, isMatch){
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

passport2.serializeUser(function(user, done) {
  done(null, user.phone);
});

passport2.deserializeUser(function(phone, done) {
  Staff.getStaffByPhone(phone, function(err, user) {
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

// Endpoint to login
main.post('/staff/login', passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
  }
);

// Endpoint to get current user
main.get('/staff', function(req, res){
	console.log(req.user);
  	res.send(req.user).end();
})


// Endpoint to logout
main.get('/staff/logout', function(req, res){
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

app.listen(3001, function(){
    console.log("The Server Has Started!");
 });
main.listen(3000, function(){
    console.log("The Server Has Started!");
 });
