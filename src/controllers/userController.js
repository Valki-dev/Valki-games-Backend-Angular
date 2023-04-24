const bycript = require("bcryptjs");
const saltRounds = 10;
const { v4: uuid } = require("uuid");
const { Videogame } = require("../models/Videogame");
const { User } = require("../models/User");
const { Wishlist } = require("../models/Wishlist");

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
        productId.trim() == ""
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'userId', 'productId'" } });
    }

    try {
        const wishlist = await Wishlist.findAll({
            where: {
                userId: userId
            }
        })

        console.log(wishlist);
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

module.exports = {
    createUser,
    logIn,
    addToWishlist,
    getUserById,
    getUserWishlist,
    updateUser
}