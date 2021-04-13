const express = require("express");

const router = express.Router();

const homembController = require('../controllers/home-member.controller');

router.get('/', homembController.getMemberPage);

module.exports = router;
