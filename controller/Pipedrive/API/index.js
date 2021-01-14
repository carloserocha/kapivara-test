const Request = require('request-promise')

const { cron } = require('../../../config')

const URL = `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${cron.pipedrive}`

async function send() {
    return await Request({
        method: 'GET',
        url: URL,
        json: true
    })
}

module.exports = { send }