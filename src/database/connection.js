const  Sequelize  = require('sequelize');


const sequelize = new Sequelize({
    database: 'railway',
    username: 'root',
    password: 'YsZdoQELeZytJsIviJoG',
    dialect: 'mysql',
    host: 'containers-us-west-49.railway.app',
    port: 6157
});


async function connection() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully');
    } catch(error) {
        console.log('Unable to connect to the database: ', error);
    }
}

module.exports = { connection, sequelize };