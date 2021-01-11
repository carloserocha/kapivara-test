module.exports = {
    name: 'kapivara-api',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://admin:N9ndNsAZsWxLDhWQ@cluster0.kad6t.mongodb.net/Kapivara?authSource=admin&replicaSet=atlas-5a5ido-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true',
    }
}