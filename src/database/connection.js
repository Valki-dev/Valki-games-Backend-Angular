const  Sequelize  = require('sequelize');


const sequelize = new Sequelize({
    database: 'videogames',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    host: 'localhost',
    port: 1433
});


async function connection() {
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully');
    } catch(error) {
        console.log('Unable to connect to the database: ', error);
    }
}

module.exports = { connection, sequelize };