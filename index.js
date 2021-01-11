const config = require('./db/config')
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

server.get('/order/', async (req, res, next) => {
    const [ data ] = await order.getCustom(req.params)
    res.send({
        ...data._doc
    })
    next()
})

server.post('/order/', async (req, res, next) => {
    const data = await order.store(req.body)

    const status = data.nModified === 1 ? 201 : 200
    res.send(status, {
        ok: Boolean (data.n)
    })
    next()
})

server.listen(config.port, async () => {
    mongoose.Promise = global.Promise

    mongoose.connect(config.db.uri, {
        useNewUrlParser: true
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