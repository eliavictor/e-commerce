const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input user\'s password']
    },
    email: {
        type: String,
        validate: [{
            validator: function (input) {
                var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return input.match(emailFormat)
            },
            message: props => `${props.value} invalid email`
        }, {
            validator: function (input) {
                return mongoose.model('User', userSchema)
                    .findOne({ email: input })
                    .then(data => { if (data) return false })
            },
            message: 'Email already registered!'
        
        }],
        required: [true, 'Please input your email']
    },
    password: {
        type: String,
        required: [true, 'Please input user\'s password'],
        minlength: 8
    },
    address: String,
    balance: Number
}, {timestamps : true});

userSchema.pre('save', function (next) {
    this.password = encrypt(this.password)
    next()
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users
