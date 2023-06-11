const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");

const Cart = sequelize.define("Cart", {
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
    amount: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "carts",
    timestamps: false
});

module.exports = {
    Cart
}