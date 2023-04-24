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
        type: DataTypes.DATE
    }
}, {
    tableName: "sales",
    timestamps: false
});

module.exports = {
    Sale
}