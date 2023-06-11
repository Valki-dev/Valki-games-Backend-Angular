const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");


const Sale = sequelize.define("Sale", {
    userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
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