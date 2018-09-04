var express = require('express');
var bcrypt = require('bcrypt');
var session = require('express-session');
const saltRounds = 10;
var User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// if (!req.session.user) {
  // 	return res.status(400).json({
  //     error: "NO USER DETECTED",
  //     message: "YOU MUST BE LOGGED IN TO VIEW DATA"
  //   });
  // }
	User.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json(data);
		}
	});
});

// sign a user up
router.post('/signup', function(req, res, next) {
	console.log(req.body);
	if (req.body.password == req.body.password2) {
		var user = new User(req.body);
		bcrypt.genSalt(saltRounds, function(err, salt) {
		    bcrypt.hash(user.password, salt)
			    .then(function(hash) {
			        // Store hash in your password DB.
			        user.password = hash;
			        user.save()
			        	.then(function(data){
			        		req.session.user = data;
			        		res.status(200).json(req.session.user);
			        	})
			        	.catch(function(err){
			    			next(err);
			    		});
			    })
			    .catch(function(err){
			    	next(err);
			    });
		});
	} else {
		res.status(500).send("Sorry Passwords do not match");
	}
});

// log a user in
router.post('/login', function(req, res, next) {
	console.log("Before checking anything.");
	var body = req.body;
	console.log(body);
	User.findOne({username: body.username}, function(err, data){
		if(err) {
			return res.status(500).send();
		}
		if(!data) {
			return res.status(500).send();
		}
		console.log("User Found, Checking Password...");
		console.log(data);
		bcrypt.compare(body.password, data.password).then(function(reser) {
		    // res == true
		    // fin
		    req.session.user = data;
  			res.status(200).json(req.session.user);
		});
	});
});

router.get('/logout', (req, res, next) => {
	req.session.user = "";
	res.status(200).json(req.session.user)
});





module.exports = router;