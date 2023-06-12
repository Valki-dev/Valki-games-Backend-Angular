const Sequelize = require('sequelize');
const { config } = require('../config/config');

let sequelize;

if (config.modeEnviroment === 'production') {
    sequelize = new Sequelize({
        database: config.production.database,
        username: config.production.username,
        password: config.production.password,
        dialect: 'mysql',
        host: config.production.host,
        port: Number(config.production.port)
    });
} else {
    sequelize = new Sequelize({
        database: config.develop.database,
        username: config.develop.username,
        password: config.develop.password,
        dialect: 'mysql',
        host: config.develop.host,
        port: Number(config.develop.port)
    });

}



async function connection() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully');
    } catch (error) {
        console.log('Unable to connect to the database: ', error);
    }
}

module.exports = { connection, sequelize };