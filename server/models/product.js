const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    img: {
        type: String,
        required: [true, 'Please input product\'s image']
    },
    name: {
        type: String,
        required: [true, 'Please input product\'s name']
    },
    description: {
        type: String,
        required: [true, 'Please input product\'s description']
    },
    price: {
        type: Number,
        required: [true, 'Please input product\'s price']
    },
    stock: {
        type: Number,
        required: [true, 'Please input product\'s stock']
    },
    hotProducts: Boolean
}, {timestamps : true});

const Products = mongoose.model('Products', productSchema);
module.exports = Products