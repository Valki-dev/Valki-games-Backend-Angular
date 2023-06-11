require('dotenv').config();

const config = {
    srtipeSecretKey: process.env.STRIPE_SECRET_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpContactEmail: process.env.SMTP_CONTACTEMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
}

module.exports = {config}