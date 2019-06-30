const jwt = require("jsonwebtoken")

module.exports = {
    sign(data) {
        return jwt.sign(data, process.env.SECRET_JWT)
        //payload {id, username} => token
    },
    decoded(token) {
        return jwt.verify(token, process.env.SECRET_JWT)
        //token => payload {id, username}
    }
}