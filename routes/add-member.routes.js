const fs = require('fs');
const express = require("express");

const router = express.Router();

const playerController = require('../controllers/add-member.controller')

router.get('/add', playerController.addMemberPage);
router.get('/edit/:mamb', playerController.editMemberPage);
router.get('/delete/:mamb', playerController.deleteMember);

router.post('/add', playerController.addMember);
router.post('/edit/:mamb', playerController.editMember);

module.exports = router;