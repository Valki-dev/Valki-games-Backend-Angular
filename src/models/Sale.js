const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");

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
        type: DataTypes.DATEONLY,
        defaulValiue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.FLOAT
    }
}, {
    tableName: "sales",
    timestamps: false
});

module.exports = {
    Sale
}