const express = require('express');
const Router = express.Router();
const productRoutes = require('./product');
const userRoutes = require('./user');
const transactionRoutes = require('./transaction');

// Resource routes
Router.use('/users', userRoutes);
Router.use('/products', productRoutes);
Router.use('/transactions', transactionRoutes);

module.exports = Router;