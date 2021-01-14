module.exports = {
    name: 'kapivara-api',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    cron: {
        pipedrive: process.env.PIPEDRIVE_TOKEN || 'a8c79a0c11df51cde212e5b708ecac4dcefefcb5',
        bling: process.env.BLING_API_KEY || '84d9ed546ae33184c878d4eea57cf57e0e940ea123edc85622d3c14858cd7c349bd14a99'
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://admin:N9ndNsAZsWxLDhWQ@cluster0.kad6t.mongodb.net/Kapivara?authSource=admin&replicaSet=atlas-5a5ido-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true',
    }
}