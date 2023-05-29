const { models, sequelize } = require("../database/connection");
const { Videogame } = require("../models/Videogame");
const { Sale } = require("../models/Sale")

const { Op } = require("sequelize");

//<<-------------------- GET -------------------->>

const getAllGames = async (req, res) => {
    try {
        const videogames = await Videogame.findAll();

        if (videogames.length == 0) {
            res.status(404).send({ message: 'Some error occurred while retrieving all videogames' });
            return;
        }

        res.status(200).send(videogames);
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getGameById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send({ status: "FAILED", data: { error: "Key missing or empty: 'id'" } });
    }

    try {
        const game = await Videogame.findByPk(id);

        if (!game) {
            res.status(400).send({ message: "Some error occurred while retrieving videogame" })
        } else {
            res.status(200).send(game);
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getGameByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        res.status(400).send({ status: "FAILED", data: { error: "Key missing or empty: 'name'" } });
    }

    try {
        const foundedGames = await Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `${name}%`
                }
            }
        });

        if (foundedGames.length == 0) {
            res.send([]);
        } else {
            res.status(200).send(foundedGames);
        }

    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getGamesRanking = async (req, res) => {
    try {   
        const [results, metadata] = await sequelize.query("SELECT S.productId, COUNT(S.productId) as 'totalVentas', P.* FROM sales S JOIN products P ON S.productId = P.id GROUP BY productId ORDER BY COUNT(S.productId) DESC LIMIT 5");

        // res.status(200).send(results)

        if(results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(500).send({message: "Some error occurred while retrieving games'ranking"});
        }
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- UPDATE -------------------->>

const updateStock = async (req, res) => {
    const { productId, amount } = req.body;

    if (
        !productId ||
        productId <= 0 ||
        !amount ||
        amount <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'id', 'amount'" } });
    }

    try {
        const game = await Videogame.findByPk(productId);

        if (game) {
            const totalAmount = (game.stock - amount);

            if (totalAmount <= 0) {
                res.status(400).send({ message: "Some error occurred while updating the videogame amount" });
                return;
            }

            try {
                const updatedGame = await Videogame.update({ stock: totalAmount }, {
                    where: {
                        id: productId
                    }
                })

                if (updatedGame === 0) {
                    res.status(400).send({ message: "Some error occurred while updating the videogame amount" });
                } else {
                    res.status(200).send({ status: "OK" });
                }

            } catch (error) {
                res.status(error?.status || 500).send(error?.message || error);
            }
        } else {
            res.status(400).send({ message: "Some error occurred while updating the videogame amount" });
        }
    } catch (error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const updateGame = async (req, res) => {
    const { id, stock, price, onOffer, isNew } = req.body;

    if(
        !id ||
        id <= 0 ||
        !stock ||
        stock <= 0 ||
        !price ||
        price <= 0 || 
        onOffer < 0 || 
        onOffer === null
    ) {
        return res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'id', 'stock', 'price', 'onOffer', 'isNew'" } });
    }

    try {
        const foundedVideogame = await Videogame.findByPk(id);

        if(foundedVideogame) {
            try {
                let onOfferPrice = 0;
                let isOnOffer = false;

                if(onOffer > 0) {
                    onOfferPrice = (price  - (price * (onOffer / 100))).toFixed(2);
                    isOnOffer = true;
                } else {
                    onOfferPrice = 0;
                }

                const updatedVideogame = await Videogame.update({
                    stock: stock,
                    price: price,
                    onOfferPrice: onOfferPrice,
                    onOffer: isOnOffer,
                    isNew: isNew
                }, {
                    where: {
                        id: id
                    }
                });

                if(updatedVideogame === 0) {
                    return res.status(500).send({ message: "Some error occurred while updating user" });
                } else {
                    return res.status(200).send({status: "OK"});
                }
            } catch(error) {
                res.status(error?.status || 500).send(error?.message || error);
            }
        } else {
            res.status(400).send({ message: "Some error occurred while updating videogame" });
        } 

    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- DELETE -------------------->>
const deleteGame = async (req, res) => {
    const { id } = req.params;

    if(
        !id ||
        id <= 0
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "Key is missing or is empty: 'id'" } });
    }

    console.log({id});

    try {
        const deletedVideogame = await Videogame.destroy({
            where: {
                id: id
            }
        })   
        
        if(deletedVideogame === 0) {
            res.status(500).send({ message: "Some error occurred while deleting videogame" })
        } else {
            res.status(200).send({status: "OK"});
        }
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

module.exports = {
    getAllGames,
    getGameById,
    getGameByName,
    getGamesRanking,
    updateStock,
    updateGame,
    deleteGame
}