const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res, next) => {
	// if (!req.session.user) {
	  // 	return res.status(400).json({
	  //     error: "NO USER DETECTED",
	  //     message: "YOU MUST BE LOGGED IN TO VIEW DATA"
	  //   });
	  // }
	Post.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json(data);
		}
	});
});

router.post('/', (req, res, next) => {
	let post = new Post(req.body);
	post.save().then((data) => {
		res.status(200).json(data);
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;