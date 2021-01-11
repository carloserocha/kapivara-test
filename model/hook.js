const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const Schema = new mongoose.Schema(
    {
        orderId: 'string'
    }, 
    { strict: false, versionKey: false }
)

Schema.plugin(timestamps)
Schema.plugin(mongooseStringQuery)

module.exports = mongoose.model('hook', Schema)