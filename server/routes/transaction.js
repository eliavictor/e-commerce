const express = require('express');
const Router = express.Router();
const transactionController = require('../controllers/transactionCon')

Router.get('/', transactionController.list)
Router.get('/:id', transactionController.findOne)
Router.get('/product/:id', transactionController.findByProduct)
Router.get('/user/:id', transactionController.findByUser)
Router.post('/', transactionController.create)
Router.put('/:id', transactionController.update)
Router.delete('/:id', transactionController.delete)

module.exports = Router;