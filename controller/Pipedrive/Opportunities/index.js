const API = require('../API')
const Model = require('../../../model')

const collection = 'order'

async function importOrders () {
    const imported = await importOrdersByApi()

    return imported
}

async function importOrdersByApi () {
    const orders = await API.send()

    if (!orders.success) throw new Error ('Nenhum pedido encontrado.')

    for (const order of orders.data) {
        const orderId = String (order.id)
        await Model[collection].store({ ...order, orderId })
    }

    return orders.data
}

module.exports = { importOrders }