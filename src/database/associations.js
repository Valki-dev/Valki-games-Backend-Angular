const { Wishlist } = require('../models/Wishlist');
const { User } = require('../models/User');
const { Videogame } = require('../models/Videogame');
const { Cart } = require("../models/Cart");
const { Sale } = require("../models/Sale");

User.hasMany(Wishlist, {
    as: 'wishlists',
    foreignKey: 'userId'
});

Wishlist.belongsTo(User, {
    as: 'users',
    foreignKey: 'userId'
});

Videogame.hasMany(Wishlist, {
    as: 'wishlists',
    foreignKey: "productId"
});

Wishlist.belongsTo(Videogame, {
    as: 'products',
    foreignKey: 'productId'
});

User.hasMany(Cart, {
    as: 'carts',
    foreignKey: 'userId'    
});

Cart.belongsTo(User, {
    as: 'users',
    foreignKey: 'userId'
});

Videogame.hasMany(Cart, {
    as: 'carts',
    foreignKey: 'productId'
});

Cart.belongsTo(Videogame, {
    as: 'products',
    foreignKey: 'productId'
});

User.hasMany(Sale, {
    as: 'sales',
    foreignKey: 'userId'
});

Sale.belongsTo(User, {
    as: 'users',
    foreignKey: 'userId'
});

Videogame.hasMany(Sale, {
    as: 'sales',
    foreignKey: 'productId'
});

Sale.belongsTo(Videogame, {
    as: 'products',
    foreignKey: 'productId'
})