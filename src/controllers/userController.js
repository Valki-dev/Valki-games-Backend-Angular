const bycript = require("bcryptjs");
const saltRounds = 10;
const { v4: uuid } = require("uuid");
const { Videogame } = require("../models/Videogame");
const { User } = require("../models/User");
const { Wishlist } = require("../models/Wishlist");
const { Cart } = require("../models/Cart");
const { Sale } = require("../models/Sale");

//<<-------------------- POST -------------------->>
const createUser = async (req, res) => {
    let { body: { userName, email, password, phoneNumber } } = req;

    if (
        !userName ||
        userName.trim() == "" ||
        !email ||
        email.trim() == "" ||
        !password ||
        password.trim() == "" ||
        !phoneNumber ||
        phoneNumber.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request body: 'userName', 'email', 'password', 'phoneNumber'" } });
    }

    try {
        const foundedUser = await getUserByEmail(email);

        if (!foundedUser) {
            password = bycript.hashSync(password, saltRounds);

            const user = {
                id: uuid(),
                userName: userName,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                subscriptionDate: new Date(),
                isAdmin: false
            }

            try {
                const createdUser = await User.create(user);

                if (!createdUser) {
                    res.status(400).send({ message: "Some error occurred while creating user" });
                }

                res.status(200).send(createdUser);
            } catch (error) {
                res.status(error?.status || 500).send(error?.message || error);
            }

        } else {
            res.status(400).send({ message: "That count already exists" });
        }
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }

}

const logIn = async (req, res) => {
    const { body: { email, password } } = req;

    if (
        !email ||
        email.trim() == "" ||
        !password ||
        password.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request body: 'email', 'password'" } });
    }

    const storagedUser = await getUserByEmail(email);

    if (storagedUser) {
        if (bycript.compareSync(password, storagedUser.password)) {
            res.status(200).send(storagedUser);
        } else {
            res.status(400).send({ message: "Some error occurred while loggin in the user" });
        }
    } else {
        res.status(404).send({ message: "Some error occurred while loggin in the user" });
    }

}

const addToWishlist = async (req, res) => {
    const { body: { userId, productId } } = req;

    if (
        !userId ||
        userId.trim() == "" ||
        !productId ||
        productId <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId'" } });
    }

    try {
        const foundedVideogame = await Wishlist.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (!foundedVideogame) {

            const videogame = {
                userId: userId,
                productId: productId
            }

            try {
                const createdWishlistItem = await Wishlist.create(videogame);

                if (!createdWishlistItem) {
                    res.status(400).send({ message: "Some error occurred while adding to wishlist" });
                }

                res.status(200).send(createdWishlistItem);

            } catch (error) {
                res.status(error?.status || 500).send(error?.message || error);
            }

        } else {
            res.status(400).send({ message: "That videogame already exists in user's wishlist" });
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const addToCart = async (req, res) => {
    const { body: { userId, productId } } = req;

    if (
        !userId ||
        userId.trim() == "" ||
        !productId ||
        productId <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId'" } });
    }

    try {
        const foundedVideogame = await Cart.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (!foundedVideogame) {

            const videogame = {
                userId: userId,
                productId: productId,
                amount: 1
            }

            try {
                const createdCartItem = await Cart.create(videogame);

                if (!createdCartItem) {
                    res.status(400).send({ message: "Some error occurred while adding to cart" });
                }

                res.status(200).send(createdCartItem);
            } catch (error) {
                res.status(error?.status || 500).send(error?.message || error);
            }
        } else {
            res.status(400).send({ message: "That videogame already exists in user's cart" });
        }
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- GET -------------------->>

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (
        !id ||
        id.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: 'id'" } });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).send({ message: "Some error occurred while retrieving user" });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    return user;
}

const getUserWishlist = async (req, res) => {
    const { id } = req.params;

    if (
        !id ||
        id.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: userId" } })
    }

    try {

        const wishlistProducts = await Wishlist.findAll({
            include: {
                model: Videogame,
                as: 'products',
                required: true
            },
            where: {
                userId: id
            }
        })

        if (wishlistProducts) {
            res.status(200).send(wishlistProducts);
        } else {
            res.status(404).send({ message: "Some error occurred while retrieving user's wishlist" });
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getUserCart = async (req, res) => {
    const { id } = req.params;

    if (
        !id ||
        id.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: userId" } })
    }

    try {
        const cartProducts = await Cart.findAll({
            include: {
                model: Videogame,
                as: 'products',
                required: true
            },
            where: {
                userId: id
            }
        });

        if (cartProducts) {
            res.status(200).send(cartProducts);
        } else {
            res.status(404).send({ message: "Some error occurred while retrieving user's Cart" })
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getUserSales = async (req, res) => {
    const { id } = req.params;

    if (
        !id ||
        id.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: userId" } })
    }

    try {
        const salesProducts = await Sale.findAll({
            include: {
                model: Videogame,
                as: 'products',
                required: true
            },
            where: {
                userId: id
            }
        });

        if (salesProducts) {
            res.status(200).send(salesProducts);
        } else {
            res.status(404).send({ message: "Some error occurred while retrieving user's sales" });
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- UPDATE -------------------->>

const updateUser = async (req, res) => {
    const { body: { userId, userName, email, password, phoneNumber, subscriptionDate } } = req;

    if (
        !userId ||
        userId.trim() == "" ||
        !userName ||
        userName.trim() == "" ||
        !email ||
        email.trim() == "" ||
        !password ||
        password.trim() == "" ||
        !phoneNumber ||
        phoneNumber.trim() == "" ||
        !subscriptionDate ||
        subscriptionDate.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'userName', 'email', 'password', 'phoneNumber', 'subscriptionDate'" } });
    }

    try {
        const user = await User.findByPk(userId);

        if (user) {
            const hashedPassword = bycript.hashSync(password, saltRounds);

            const userUpdated = await User.update({
                userName: userName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
            }, {
                where: {
                    id: userId
                }
            })

            if (!userUpdated) {
                res.status(500).send({ message: "Some error occurred while updating user" });
            }

            res.status(200).send(userUpdated)
        } else {
            res.status(500).send({ message: "Some error occurred while updating user" });
        }
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- DELETE -------------------->>
const deleteFromWishlist = async (req, res) => {
    const { params: { userId }, query: { productId } } = req;

    if (
        !userId ||
        userId.trim() == "" ||
        !productId ||
        productId <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId'" } });
    }

    try {
        const deletedVideogame = await Wishlist.destroy({
            where: {
                userId: userId,
                productId: productId
            }
        });

        console.log(deletedVideogame);

        if (deletedVideogame === 0) {
            res.status(500).send({ message: "Some error occurred while deleting videogame" })
        }

        res.status(200).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

module.exports = {
    createUser,
    logIn,
    addToWishlist,
    addToCart,
    getUserById,
    getUserWishlist,
    getUserCart,
    getUserSales,
    updateUser,
    deleteFromWishlist
}