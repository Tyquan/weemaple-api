const express = require('express');
const router = express.Router();
const Task = require('../models/task')

// Tasks Page
router.get('/', function(req, res, next) {
  // if (!req.session.user) {
  //  return res.status(400).json({
  //     error: "NO USER DETECTED",
  //     message: "YOU MUST BE LOGGED IN TO VIEW DATA"
  //   });
  // }
  Task.find((err, data) => {
  	if (err) {
  		next(err);
  	} else {
  		res.status(200).json(data);
  	}
  });
});

module.exports = router;