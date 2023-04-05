const { DataTypes } = require("sequelize");

const Wishlist = (sequelize) => sequelize.define("Wishlist", {
    userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'wishlists',
    timestamps: false
});

module.exports = {
    Wishlist
}