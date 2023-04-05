const { Sequelize } = require('sequelize');
const { Videogame } = require('../models/Videogame.js');
const { User } = require('../models/User.js');
const { Wishlist } = require('../models/Wishlist.js');
const { Sale } = require("../models/Sale.js");
const { Cart } = require("../models/Cart.js");

const sequelize = new Sequelize({
    database: 'videogames',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    host: 'localhost',
    port: 1433
});

const models = {};

function initModels(sequelize) {
    models.Videogame = Videogame(sequelize);
    models.User = User(sequelize);
    models.Wishlist = Wishlist(sequelize);
    models.Sale = Sale(sequelize);
    models.Cart = Cart(sequelize);
}

async function connection() {
    try {
        await sequelize.authenticate();
        initModels(sequelize);
        console.log('Connection has been established successfully');
    } catch(error) {
        console.log('Unable to connect to the database: ', error);
    }
}

module.exports = { connection, models };