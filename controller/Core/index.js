const logger = console

function importControllerFuncByName ({ name, type }) {
    const controller = require(`../${name}`)
    const func = type === 'source' ? 'importOrders' : 'exportOrders'
    return controller[func] // exporta a função puramente para posteriormente executar
}

async function start (services) {
    for (const service of services) {
        logger.info(`Executando ${service.type} de ${service.name}`)
        const func = importControllerFuncByName(service)

        const processed = await func()

        logger.info(`Processando ${processed.length} pedido(s) no total...`)
    }

    return true
}

module.exports = { start }