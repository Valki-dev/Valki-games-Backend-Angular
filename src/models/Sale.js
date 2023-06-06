// const { options } = require("apicache");
const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");

const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
}

const Sale = sequelize.define("Sale", {
    userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    saleDate: {
        type: DataTypes.DATE
    },
    orderNumber: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.FLOAT
    },
    downloadCode: {
        type: DataTypes.STRING
    }
}, {
    tableName: "sales",
    timestamps: false
});

module.exports = {
    Sale
}