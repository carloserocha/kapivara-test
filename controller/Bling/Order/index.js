const API = require('../API')
const Parser = require('./parser')

async function _exists({ orderId }) {
    const URL = `https://bling.com.br/Api/v2/pedido/${orderId}/json`
    const order = await API.send({ url: URL })

    const { retorno: { erros } } = order

    if (!erros) return true
    else return false
}

async function processOrder(order) {
    if (await _exists(order)) return true

    const URL = `https://bling.com.br/Api/v2/pedido/json/`
    const parsed = Parser.handle(order)

    const processed = await API.send({ url: URL, qs: parsed, postData: true })

    const { retorno: { erros, pedidos } } = processed

    if (!erros) return true
    else return false
}

module.exports = {
    processOrder
}