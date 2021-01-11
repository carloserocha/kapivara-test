const Request = require('request-promise')

const DEFAULT_URL = 'https://bling.com.br/Api/v2/'

async function sendOrder(Body={}) {
    const URL = DEFAULT_URL + 'pedido/json/'
    const METHOD = 'POST'

    return await send(URL, METHOD, Body)
}

async function send(URL, Method, Body={}, QueryString={}) {
    QueryString.apikey = process.env.BLING_API_KEY

    return await Request({
        method: 'POST',
        url: URL,
        body: Body,
        json: true
    })
}

module.exports = {
    send,
    sendOrder
}