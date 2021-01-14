async function importOrders() {
    const Oportunities = require('./Opportunities')
    return await Oportunities.importOrders()
}

module.exports = {
    importOrders
}