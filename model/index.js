const Hook = require('./hook')
const Order = require('./order')

class HookController {
    async getCustom(params) {
        const data = await Hook.apiQuery(params)
        return data
    }
    async store(hook) {
        const data = await Hook.update({
            orderId: hook.orderId,
            status: hook.status
        }, { $set: hook })

        return data
    }
}

class OrderController {
    async getCustom(params) {
        const data = await Order.apiQuery(params)
        return data
    }
    async store(order) {
        const data = await Order.update({
            orderId: order.orderId
        }, { $set: order }, { upsert: true }).lean()
        return data
    }
}

module.exports = {
    hook: new HookController(),
    order: new OrderController()
}