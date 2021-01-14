const Hook = require('./hook')
const Order = require('./order')

class HookController {
    async getCustom(params) {
        const data = await Hook.apiQuery(params)
        return data
    }
    async store(hook) {
        const data = await Hook.updateOne({
            orderId: hook.orderId,
        }, { $set: hook }, { upsert: true })

        return data
    }
}

class OrderController {
    async getCustom(params) {
        const data = await Order.apiQuery(params)
        return data
    }
    async store(order) {
        const data = await Order.updateOne({
            orderId: order.orderId
        }, { $set: order }, { upsert: true }).lean()
        return data
    }

    async getAllNotIntegrated() {
        const data = await Order.find({ bling_integrated: { $exists: false }}).lean() // pedidos não integrados no Bling
        return data
    }

    async setAsIntegrated(order) {
        const data = await Order.updateOne({
            orderId: order.orderId
        }, { $set: { bling_integrated: true } }, { upsert: true }).lean()
        return data
    }
}

module.exports = {
    hook: new HookController(),
    order: new OrderController()
}