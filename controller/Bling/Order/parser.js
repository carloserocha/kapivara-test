const Moment = require('moment')
const XMLConverter = require('xml-js')

const xmlConverterOptions = { compact: true, ignoreComment: true, spaces: 0 }

const DEFAULT_SKU_PRODUCT = 'teste'

function handle(context) {
    const order = {
        ...extractOrderId(context),
        ...extractData(context),
        ...extractPayer(context),
        ...extractItems(context),
        ...extractPayment(context)
    }

    return { xml: XMLConverter.js2xml({ pedido: order }, xmlConverterOptions) }
}

function extractOrderId({ orderId }) {
    return { numero: orderId }
}

function extractData({ add_time }) {
    return { data: Moment(add_time).format('DD/MM/YYYY') }
}

function extractPayer(context) {
    const payer = {
        ...extractPayerName(context),
        ...extractPayerEmail(context),
        ...extractPayerPhone(context),
    }

    return { cliente: payer }
}

function extractPayerName({ person_id: { name } }) {
    return { nome: name }
}

function extractPayerEmail({ person_id: { email } }) {
    const [_email] = email.filter(e => e.value.length > 0)
    if (!_email) return {}

    return { email: _email }
}

function extractPayerPhone({ person_id: { phone } }) {
    const [_phone] = phone.filter(e => e.value.length > 0)
    if (!_phone) return {}

    return { celular: _phone }
}

function extractItems(context) {
    return { items: extractItem(context) }
}

function extractItem(context) {
    const { title, products_count, weighted_value } = context
    return {
        item: {
            codigo: DEFAULT_SKU_PRODUCT,
            descricao: title,
            qtde: products_count,
            vlr_unit: weighted_value / products_count
        }
    }
}

function extractPayment(context) {
    return {
        parcelas: [
            {
                ...extractPaymentDetails(context)
            }
        ]
    }
}

function extractPaymentDetails({ weighted_value }) {
    return {
        vlr: weighted_value
    }
}

module.exports = { handle }