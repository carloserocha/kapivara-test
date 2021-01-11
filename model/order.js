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

Schema.pre('find', (next) => {
    delete this._id

    next() // função não bloqueante
})

Schema.pre('update', (next) => {
    let now = Date.now()

    this.updatedAt = now
    if (!this.createdAt) this.createdAt = now

    next() // função não bloqueante
})

module.exports = mongoose.model('orders', Schema)