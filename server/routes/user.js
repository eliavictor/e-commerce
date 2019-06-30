const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userCon')

Router.post('/signup', userController.signUp)
Router.post('/signin', userController.signIn)
// Router.post('/gsignin', userController.gSignin)

module.exports = Router;