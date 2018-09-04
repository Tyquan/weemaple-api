const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

router.get('/cnn', (req, res, next) => {
	const options = {
		uri: 'https://money.cnn.com',
		transform: (body) => {
			return cheerio.load(body);
		}
	};
	rp(options).then((data) => {
		console.log(data);
	}).catch((err) => {
		next(err);
	});
});

module.exports = router;