const express = require('express');
const router = express.Router();
const Interest = require('../models/interest');

// Interest Page
router.get('/', function(req, res, next) {
  // if (!req.session.user) {
  // 	return res.status(400).json({
  //     error: "NO USER DETECTED",
  //     message: "YOU MUST BE LOGGED IN TO VIEW DATA"
  //   });
  // }
  Interest.find((err, data) => {
  	if (err) {
  		next(err);
  	} else {
  		res.status(200).json(data);
  	}
  });
});

router.post("/", function(req, res, next){
	var interest = new Interest(req.body);
	interest.save().then(function(data){
		res.status(200).json(data);
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;