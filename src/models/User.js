const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");
const { Wishlist } = require("./Wishlist");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING(30)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    password: {
        type: DataTypes.STRING(100)
    },
    phoneNumber: {
        type: DataTypes.STRING(9)
    },
    subscriptionDate: {
        type: DataTypes.DATE
    },
    isAdmin: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = {
    User
}