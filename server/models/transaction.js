const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref : "Product"
    },
    amount: Number,
    status: String
}, {timestamps : true});

const Transactions = mongoose.model('Transactions', transactionSchema);
module.exports = Transactions