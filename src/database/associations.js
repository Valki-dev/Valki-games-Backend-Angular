const { Wishlist } = require('../models/Wishlist');
const { User } = require('../models/User');
const { Videogame } = require('../models/Videogame');


User.hasMany(Wishlist, {
    as: 'wishlists',
    foreignKey: "userId"
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

