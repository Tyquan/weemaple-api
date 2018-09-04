const express = require('express');
const router = express.Router();
const request = require('request');
const bitcore = require("bitcore-lib");
const BitcoinModel = require('../models/bitcoin');

router.get("/", function(req, res) {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }
	request({
		url: "https://blockchain.info/stats?format=json",
		json: true
	}, function(error, response, body) {
		res.status(200).json(body);
	});
});

router.get("/mydata", (req, res, next) => {
	// if (!req.session.user) {
	// 	return res.status(400).send("You have to be logged in to view this section");
	// }
	BitcoinModel.find((err, data) => {
		if (err) {
			next(err);
		} else {
			res.status(200).json(data);
		}
	});
});

router.post("/", (req, res) => {
	let tenzosrc = req.body.tenzosrc;
	let input = new Buffer(tenzosrc);
	let hash = bitcore.crypto.Hash.sha256(input);
	let bn = bitcore.crypto.BN.fromBuffer(hash);
	let pk = new bitcore.PrivateKey(bn).toWIF();
	let addy = new bitcore.PrivateKey(bn).toAddress();
	let bitcoinInfo = {
		wallet: tenzosrc,
		address: addy,
		privateKey: pk
	};
	res.status(200).json(bitcoinInfo);
});

module.exports = router;