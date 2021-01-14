const Order = require('./Order')

const Model = require('../../model/')

async function exportOrders() {
    const orders = await Model['order'].getAllNotIntegrated()
    for (const order of orders) {
        const processed = await Order.processOrder(order)

        if (processed) await Model['order'].setAsIntegrated({ orderId: order.orderId, bling_integrated: true })
    }

    return orders
}

module.exports = {
    exportOrders
}