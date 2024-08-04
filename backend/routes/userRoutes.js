const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');


router.post('/register', userController.postUserSignUp);

router.post('/login', userController.postUserLogin);


module.exports = router;