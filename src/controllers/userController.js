const bycript = require("bcryptjs");
const saltRounds = 10;
const { v4: uuid } = require("uuid");
const { Videogame } = require("../models/Videogame");
const { User } = require("../models/User");
const { Wishlist } = require("../models/Wishlist");
const { Cart } = require("../models/Cart");
const { Sale } = require("../models/Sale");
const { use } = require("../v2/UsersRoutes");

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

const addToSales = async (req, res) => {
    const { body: { userId, productId, amount, price } } = req;

    if(
        !userId ||
        userId.trim() == ""||  
        !productId ||
        productId <= 0 ||
        !amount ||
        amount <= 0 ||
        !price ||
        price <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId', 'amount', 'price'" } });
    }

    const sale = {
        userId: userId,
        productId: productId,
        saleDate: new Date(),
        amount: amount,
        price: price
    }

    console.log(sale);

    try {
        const createdSale = await Sale.create(sale);
        console.log(createdSale);
        if(!createdSale) {
            res.status(400).send({message: "Some error occurred while creating sale"});
        } else {
            res.status(200).send(createdSale);
        }

    } catch(error) {
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

const comparePassword = async (req, res) => {

    const { body: { id, currentPassword } } = req;

    if(
        !id ||
        id.trim() == "" ||
        !currentPassword ||
        currentPassword.trim() == ""
    ) {
        res.status(400).send({ error: "FAILED", data: { error: "One of the following keys is missing or is empty: 'id', 'currentPassword'" } });
    }

    try {
        const user = await User.findByPk(id);

        if(user) {
            if (bycript.compareSync(currentPassword, user.password)) {
                res.status(200).send({ message: true });
            } else {
                res.status(200).send({ message: false });
            }
        } else {
            res.status(404).send({ message: "Some error occurred while retrieving user" });
        }
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- UPDATE -------------------->>

//TODO Comprobar que este método funciona
const updateUser = async (req, res) => {
    const { body: { userId, userName, email, phoneNumber, subscriptionDate } } = req;

    if (
        !userId ||
        userId.trim() == "" ||
        !userName ||
        userName.trim() == "" ||
        !email ||
        email.trim() == "" ||
        !phoneNumber ||
        phoneNumber.trim() == "" ||
        !subscriptionDate ||
        subscriptionDate.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'userName', 'email', 'phoneNumber', 'subscriptionDate'" } });
    }

    try {
        const user = await User.findByPk(userId);

        if (user) {
            // const hashedPassword = bycript.hashSync(password, saltRounds);

            try {
                const updatedUser = await User.update({
                    userName: userName,
                    email: email,
                    phoneNumber: phoneNumber,
                }, {
                    where: {
                        id: userId
                    }
                })
    
                if (updatedUser === 0) {
                    res.status(500).send({ message: "Some error occurred while updating user" });
                } else {
                    res.status(200).send({status: "OK"})
                }
    
            } catch(error) {
                res.status(error?.status || 500).send(error?.message || error);
            }
        } else {
            res.status(500).send({ message: "Some error occurred while updating user" });
        }
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const updateAmount = async (req, res) => {
    const { body: { userId, productId, amount } } = req;

    if(
        !userId ||
        userId.trim() == "" ||
        !productId ||
        productId <= 0 ||
        !amount ||
        amount <= 0
    ) {
        res.status(400).send({ error: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId', 'amount'" } });
    }

    try {
        const videogame = await Cart.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if(videogame) {
            try {
                const updatedVideogame = await Cart.update({
                    amount: amount
                }, {
                    where: {
                        userId: userId,
                        productId: productId
                    }
                });
    
                if(updatedVideogame === 0) {
                    res.status(500).send({ message: "Some error occurred while updating videogame's amount" });
                } else {
                    res.status(200).send({ status: "OK" });
                }
    
                
            } catch(error) {
                res.status(error?.status || 500).send(error?.message || error);
            }
        } else {
            res.status(500).send({ message: "Some error occurred while updating amount" });
        }
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const updatePassword = async (req, res) => {
    const { body: { id, password } } = req;

    if(
        !id ||
        id.trim() == "" ||
        !password ||
        password.trim() == ""
    ) {
        res.status(400).send({ error: "FAILED", data: { error: "One of the following keys is missing or is empty: 'id', 'password'" } });
    }
    //! TERMINAR

    try {
        const encryptedPassword = bycript.hashSync(password, saltRounds);

        const updatedPassword = await User.update({
            password: encryptedPassword,
        }, {
            where: {
                id: id
            }
        });

        if(updatedPassword === 0) {
            res.status(500).send({ message: "Some error occurred while updating videogame's amount" });
        } else {
            res.status(200).send({status: "OK"});
        }
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- DELETE -------------------->>
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(
        !id ||
        id.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: 'id'" } });
    }

    try {
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });

        if(deletedUser === 0) {
            res.status(500).send({ message: "Some error occurred while deleting user" })
        }

        res.status(200).send({ status: "OK" });
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}


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

        if (deletedVideogame === 0) {
            res.status(500).send({ message: "Some error occurred while deleting videogame from user's wishlist" })
        }

        res.status(200).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const deleteFromCart = async (req, res) => {
    const { params: {userId}, query: { productId } } = req;

    if(
        !userId ||
        userId.trim() == "" ||
        !productId ||
        productId <= 0
    ) {
        res.status("400").send({ status: "FAILED", data:{ error: "One of the following keys is missing or is empty: 'userId', 'productId'" } })
    }

    try {
        const deletedVideogame = await Cart.destroy({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if(deletedVideogame === 0) {
            res.status(500).send({ message: "Some error occurred while deleting videogame from user's Cart" })
        }
        res.status(200).send({ status: "OK" });
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

module.exports = {
    createUser,
    logIn,
    addToWishlist,
    addToCart,
    addToSales,
    getUserById,
    getUserWishlist,
    getUserCart,
    getUserSales,
    comparePassword,
    updateUser,
    updateAmount,
    updatePassword,
    deleteUser,
    deleteFromWishlist,
    deleteFromCart
}