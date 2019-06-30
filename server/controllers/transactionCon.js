const { decoded } = require('../helpers/jwt')
const Transaction = require('../models/transaction')

class TransactionController {
    static list(req, res, next) {
        Transaction.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            userId: token.id,
            productId: req.body.idProduct,
            amount: req.body.amount,
            status: false
        }
        Transaction.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Transaction.findOne({_id : req.params.id})
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static findByProduct(req, res, next) {
        Transaction.findOne({ productId : req.params.id })
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static findByUser(req, res, next) {
        Transaction.find({userId : req.params.id})
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static update(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            userId: token.id,
            productId: req.body.idProduct,
            amount: req.body.amount,
            status: false
        }
        Transaction.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                // console.log(obj, 'ini OBJ')
                data.set(obj)
                // console.log(data, 'ini Data')
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Transaction.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}
module.exports = TransactionController