const fs = require('fs');
const express = require("express");

const router = express.Router();

const playerController = require('../controllers/add-sp.controller')

router.get('/add', playerController.addPlayerPage);
router.get('/edit/:masp', playerController.editPlayerPage);
router.get('/delete/:masp', playerController.deletePlayer);
router.post('/add', playerController.addPlayer);
router.post('/edit/:masp', playerController.editPlayer);

module.exports = router;
