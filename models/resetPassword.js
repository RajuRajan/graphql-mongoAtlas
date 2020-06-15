const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const resetSchema = new Schema({
    secretKey: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('ResetPassword',resetSchema)