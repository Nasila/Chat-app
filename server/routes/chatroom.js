const express = require('express');
const router = express.Router();
const { chatroomController } = require('../controllers/chatroomController');
const auth = require('../middlewares/auth');

router.post('/', auth, chatroomController);


module.exports = router;