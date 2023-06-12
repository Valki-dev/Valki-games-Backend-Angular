require('dotenv').config();

const config = {
    srtipeSecretKey: process.env.STRIPE_SECRET_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpContactEmail: process.env.SMTP_CONTACTEMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
    modeEnviroment: process.env.MODE,
    production: {
        database: process.env.DATABASE_PRODUCTION,
        username: process.env.USERNAME_PRODUCTION,
        password: process.env.PASSWORD_PRODUCTION,
        host: process.env.HOST_PRODUCTION,
        port: process.env.PORT_PRODUCTION,
    },
    develop: {
        database: process.env.DATABASE_DEVELOP,
        username: process.env.USERNAME_DEVELOP,
        password: process.env.PASSWORD_DEVELOP,
        host: process.env.HOST_DEVELOP,
        port: process.env.PORT_DEVELOP,
    }
}

module.exports = { config }