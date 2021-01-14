const config = require('./config')
const mongoose = require('mongoose')

const services = [
    {
        name: 'bling',
        type: 'target'
    },
    {
        name: 'pipedrive',
        type: 'source'
    }
]

mongoose.Promise = global.Promise

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (err) => {
    console.error(err)
    process.exit(1)
})

db.once('open', () => {
    const Core = require('./controller/Core')
    Core.start(services)  
})