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

db.once('open', async () => {
    console.log('Core started')

    const Core = require('./controller/Core')
    await Core.start(services)

    console.log('Core finished')

    db.close(false, () => {
        console.log('Database closed successfully')
        process.exit(0)
    })
})

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received')

    db.close(false, () => {
        console.log('Database closed successfully')
        process.exit(0)
    })
})