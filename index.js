const config = require('./config')
const mongoose = require('mongoose')
const Restify = require('restify')
const restifyPlugins = require('restify-plugins')

const { order, hook } = require('./model/')

const server = Restify.createServer({
    name: config.name,
    version: config.env
})

server.use(restifyPlugins.fullResponse())
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.jsonBodyParser({
    mapParams: true
}))
server.use(restifyPlugins.queryParser({
    mapParams: true
}))

server.get('/hook', async (req, res, next) => {
    const data = await hook.getCustom(req.params)

    const len = data.length

    if (len === 0) { res.send(404, { hooks: [] }) }
    else { res.send(302, { hooks: data }) }

    next()
})

server.get('/order', async (req, res, next) => {
    const data = await order.getCustom(req.params)
    const len = data.length

    if (len === 0) { res.send(404, { orders: [] }) }
    else { res.send(302, { orders: data }) }

    next()
})

server.post('/order', async (req, res, next) => {
    const data = await order.store(req.body)

    const status = data.nModified === 1 ? 201 : 200
    res.send(status, {
        ok: Boolean(data.n)
    })
    next()
})

server.listen(config.port, async () => {
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
        console.log(`${server.name} listening at ${server.url}`)
    })
})


process.on('SIGTERM', () => {
    console.info('SIGTERM signal received')
    server.close(() => {

        console.log(`${server.name} is down`)
        mongoose.connection.close(false, () => {
            console.log('Database closed successfully')
            process.exit(0)
        })
    })
})