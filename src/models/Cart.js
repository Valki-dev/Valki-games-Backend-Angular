const { DataTypes } = require("sequelize");

const Cart = (sequelize) => sequelize.define("Cart", {
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