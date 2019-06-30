const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productCon')
const { Authentication, Authorization, AddAuthorization } = require('../middlewares/auth')
const uploadToGCS = require('../middlewares/upload')
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 4900000
    }
});

Router.get('/', productController.list)
Router.get('/:id', productController.findOne)
Router.use(Authentication)
Router.post('/', AddAuthorization, multer.single('file'), uploadToGCS, productController.create)
Router.put('/:id', Authorization, productController.update)
Router.delete('/:id', Authorization, productController.delete)

module.exports = Router;