const express = require('express');
const router = express.Router();
const {register,login, userList, addInvites, currentUser, updateContact, updateInvitedUser, addMessage} = require('../controllers/userController')
const auth = require('../middlewares/auth');


router.post('/login', login);
router.get('/userlist/:id', auth, userList);
router.post('/register', register);
router.put('/addInvites/:id',addInvites);
router.get('/currentUser/:id', currentUser);
router.put('/updateContact/:id', updateContact)
router.put('/updateInInvite/:id', updateInvitedUser)
router.post('/addMessage',addMessage);
module.exports = router;