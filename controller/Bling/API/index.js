const Request = require('request-promise')

const { cron } = require('../../../config')

async function send({url, postData=null, qs }) {
    const query = { apikey: cron.bling, ...qs }

    const options = {
        method: !postData ? 'GET' : 'POST',
        url: url,
        qs: query,
        body: postData || {},
        json: true
    }

    return await Request(options)
}

module.exports = {
    send
}