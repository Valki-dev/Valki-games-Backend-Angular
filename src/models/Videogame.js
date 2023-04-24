const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { Wishlist } = require("./Wishlist");

const Videogame = sequelize.define("Videogame", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT
    },
    developer: {
        type: DataTypes.TEXT
    },
    publisher: {
        type: DataTypes.TEXT
    },
    releaseDate: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 200
    },
    price: {
        type: DataTypes.FLOAT
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    onOffer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    URL: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'products',
    timestamps: false,
});

module.exports = {
    Videogame
}