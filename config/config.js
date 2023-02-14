require('dotenv').config({ path: require('find-config')('.env') })


const config = {
    PORT: 5009,
    DB_CONNECTION: `mongodb+srv://tsankovelichkov:${process.env.DATABASE_PASSWORD}@cluster0.omm2s7n.mongodb.net/intelliPharma`,
    SALT_ROUNDS: 10,
    SECRET: 'levskishampion',
    COOKIE_NAME: 'USER_SESSION'
}

module.exports = config