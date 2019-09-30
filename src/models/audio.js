const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
    toLang: {
        type: String,
        required: true
    },
    fromLang: {
        type: String,
        required: true
    },
    fileName: {
        required: true,
        type: String
    },
    finished: {
        type: Boolean,
        default: false
    }
})

const Audio = mongoose.model('Song', audioSchema)

module.exports = Audio