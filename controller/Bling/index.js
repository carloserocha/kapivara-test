const Order = require('./Order')

const Model = require('../../model/')

async function exportOrders() {
    const orders = await Model['order'].getAllNotIntegrated()
    for (const order of orders) {
        const processed = await Order.processOrder(order)

        if (processed) {
            const orderId = String (order.id)
            const weighted_value = Number (order.weighted_value)
            const date = Moment(order.add_time).format()
            
            await Model['hook'].store({orderId, weighted_value, date })
            await Model['order'].setAsIntegrated({ orderId, bling_integrated: true })
        }
    }

    return orders
}

module.exports = {
    exportOrders
}