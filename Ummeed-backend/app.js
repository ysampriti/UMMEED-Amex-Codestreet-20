var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var cookieParser          = require('cookie-parser');
var session               = require('express-session');
var Hospital              = require("./models/hospital")
var User                  = require('./models/user')
var Transaction                  = require('./models/transaction')
var Staff                  = require('./models/hospitalStaff')
var passport              = require('passport');
var passport2             = require('passport');
var cors                  = require('cors');

mongoose.connect("mongodb+srv://Avinash:Avinash@1@cluster0.pqqse.mongodb.net/db?retryWrites=true&w=majority",{useNewUrlParser:true});

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var main =  express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cookieParser());
app.use(cors());
main.use(cors());

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


//Register staff
main.post('/register', function(req, res){
  console.log(req.body);
  Hospital.find({name:req.body.hospital},function(err,allHospital){
    if(err)
    {
      console.log(err);
      return res.status(500);    
    }
    
    if(allHospital.length !=1)return res.status(500);

    var users = new Staff({
    name:       req.body.name,
    worksAt :  allHospital[0],
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
});

app.post('/bookbed',function(req,res){
  console.log(req.body);
  var trans = {};
    User.getUserByPhone(req.body.phone, function(err, user){
      if(err) throw err;
      console.log('monil' , user);
      if(!user){
      trans = new Transaction({
          name : req.body.name,
          phone : req.body.phone,
          hospital : req.body.hospital,
          whatHappened : req.body.whatHappened
        })
      }
      else{
          trans = new Transaction({
          name : user.name,
          age : user.age,
          bloodgrp:user.bloodgrp,
          insurance:user.insurance,
          phone:user.phone,
          history:user.history,
          hospital : req.body.hospital,
          whatHappened  : req.body.whatHappened
        })
      }
      console.log('printing' , trans);
      Transaction.create(trans,function(err,newTrans){
        if(err){
          console.log(err);
          return res.status(500);
        }
        console.log(newTrans);
        res.status(200).send(newTrans).end();
      });
   });
    
})

main.get('/transactions',function(req,res){
  Transaction.find({hospital:req.body.hospital},function(err,transactions){
    if(err)
    {
      console.log(err);
      res.send("null");
    }
    else res.send(transactions);
    });
});

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


app.get("/emergencyContacts/:phone", function(req, res){
User.findOne({phone:req.params.phone}).populate('emergencyContactFor').exec(function(err,user){
      if(err){
        console.log(err);
        return res.status("500");
      }
      else{
        console.log(user);
        var answer={
         emergency:user.emergencyContactFor 
        };
        return res.send(answer);
      }
  });
});



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

app.post('/:hospitalid/updateBeds',function(req,res){
  Hospital.findById(req.params.hospitalid,function(err,hospital){
    if(err)
    {
      console.log(err);
      return res.status(500);    
    }
    hospital.freeBeds=req.body.beds;
    hospital.save();
    return res.send(hospital);
  });
});

app.post('/:hospitalid/updateVents',function(req,res){
  Hospital.findById(req.params.hospitalid,function(err,hospital){
    if(err)
    {
      console.log(err);
      return res.status(500);    
    }
    hospital.freeVentilators=req.body.ventilators;
    hospital.save();
    res.send(hospital);
  });
});

// Endpoint to logout
main.get('/staff/logout', function(req, res){
  req.logout();
  res.send(null)
});

app.put('/addEmergencyContact',function(req,res){
  User.getUserByPhone(req.body.userPhone,function(err,user1){
    if(err){
      console.log(err);
      return res.status(500);
    }
    req.body.newEC.forEach(phone => {
      User.getUserByPhone(phone,function(err,user2){
        if(err){
          console.log(err);
          return res.status(500);
        }
        user2.emergencyContactFor.push(user1);
        user2.save();
        user1.emergencyContact.push(user2);
        user1.save();
      })
    })
    res.send(user1);
  });
});

app.get('/',function(req,res){
  console.log("HERE");
  Hospital.find({},function(err,hospitals){
    if(err)
    {
      console.log(err);
      res.send("null");
    }
    else res.send(hospitals);
    });
});



app.listen(3001, function(){
    console.log("The Server Has Started!");
 });
main.listen(3000, function(){
    console.log("The Server Has Started!");
 });