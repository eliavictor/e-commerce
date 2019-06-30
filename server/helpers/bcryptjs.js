const bcryptjs = require('bcryptjs');
let salt = bcryptjs.genSaltSync(7);

module.exports = { 
    encrypt(password) {
        return bcryptjs.hashSync(password, salt);
    },
    decrypt(password, hashedPassword) {
        return bcryptjs.compareSync(password, hashedPassword);
    }
}