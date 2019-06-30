const User = require('../models/user')
const { decrypt } = require("../helpers/bcryptjs")
const { sign } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {
    static signIn(req, res, next) {
        let signInItem = {
            email : req.body.email,
            password : req.body.password
        }
        // console.log(signInItem, 'ini signinItem')
        User.findOne({ email: signInItem.email })
        .then(user => {
            if (!user) {
                throw res.status(404).json({ message: "User not found, please sign up" })
            } else {
                let checkPassword = decrypt(signInItem.password, user.password)
                if (checkPassword) {
                    let payload = {
                      id: user._id,
                      name: user.name,
                      email: user.email
                    }
                    let token = sign(payload)
                    res.status(201).json({token: token, name: payload.name, email: payload.email, userId: payload.id})
                } else {
                    res.status(404).json({ message: "Invalid email / password" })
                }
                // res.json(user);
            }
        })
        .catch(next);
    }

    static signUp(req, res, next) {        
        let newUser = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            balance: req.body.balance
        }
        // console.log(newUser)
        User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static gSignin(req,res, next){
        // console.log("AAAAAAA")
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken:req.body.idToken,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const name = payload.name
            const email = payload.email
            const userPayload = await User.findOne({
                email:email
            })
            if(userPayload){
                // console.log("VVVVVV")
                const payload = {
                    id: userPayload._id,
                    name: userPayload.name,
                    email: userPayload.email
                }
                const token = sign(payload)
                let obj = {token:token, name:userPayload.name, id: userPayload._id}
                res.status(200).json(obj)
            }
            else{
                const password = 'todo123'
                const newUser = await User.create({
                    name: name,
                    email: email,
                    password: password
                })
                const payload = {
                    id: newUser._id,
                    email: newUser.email
                }
                const token = sign(payload)
                let obj = {token:token, name:newUser.name, id: newUser._id}
                res.status(201).json(obj)
            }
        }
        verify().catch(next)
    }
}

module.exports = UserController