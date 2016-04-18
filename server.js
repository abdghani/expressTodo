var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var api = require('./routes/api.js');
var auth = require('./auths/auth.js');
var mongoose = require('mongoose');
var connectionString = auth.mongooseUrl;
var db = mongoose.connect(connectionString);
var passport = require('passport');
var session = require('express-session');
var Strategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');
app.use(session({secret:'this id the secret'}));
var todouser = require('./models/users.js');

///////////////////facebook////////////////////
passport.use(new Strategy({
    clientID:auth.facebook.id,
    clientSecret:auth.facebook.secret,
    callbackURL: auth.facebook.callback,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    	//return cb(null, profile);
    	
    	todouser.findOne({userid:profile.id},function(err,data){
    		if(err){
    			return cb(err,null)
    		}
    		if(data){
    			if(data.photoUrl === profile.photos[0].value){
    				return cb(null,data)
    			}
    			else{
    				//updating the photo section
    				todouser.update({userid:profile.id},
    								{
    									$set:{
    										'photoUrl':profile.photos[0].value
    									}
    								},
    								function(err,data){
    									todouser.findOne({userid:profile.id},function(err,data){
					    					return cb(null,data)
					    				})
    								}

    					)
    			}
    		}
    		else{
    				//adding fresh
    				var newtodouser =new todouser({
    					userid:profile.id,
    					displayName:profile.displayName,
    					photoUrl:profile.photos[0].value
    				})
    				newtodouser.save(function(err,data){
    					if(err){
    						console.log("error adding new record")
    					}
    					else{
    						todouser.findOne({userid:profile.id},function(err,data){
		    					return cb(null,data)
		    				})
    					}
    				
    				})
    		}
    	})
}));
passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user,done){
	done(null,user);
});
///////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname+'/views/'));
app.use(express.static(__dirname+'/public/'));
app.use(express.static(__dirname+'/images/'));
app.use(morgan('dev'))
app.use('/api',api);
app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('index.ejs');
})

app.get('/login',function(req,res){
	res.render('login.ejs')
})

app.get('/login/facebook',passport.authenticate('facebook'));

app.get('/login/facebook/return',passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: true }),function(req, res) {
   res.redirect('/#/todo');
});

app.get('/addUser',function(req,res){
	res.send(req.user)
})

app.post('/logout',function(req,res){
	req.logOut();
	res.send(200);
})

app.get('/loggedin',function(req,res){
	res.send(req.isAuthenticated() ? req.user : '0');
})

app.listen(auth.port,auth.ip,function(){
	console.log("server live at port "+auth.port)
})

var isEmpty = function(obj){
	if(JSON.stringify(obj) === '{}'){
		return true
	}
	else{
		return false
	}
}