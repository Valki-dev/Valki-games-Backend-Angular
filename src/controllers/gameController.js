const { models } = require("../database/connection");
const { Videogame } = require("../models/Videogame");

const { Op } = require("sequelize");

//<<-------------------- GET -------------------->>

const getAllGames = async (req, res) => {
    try {
        const videogames = await Videogame.findAll();

        if(videogames.length == 0) {
            res.status(404).send({message: 'Some error occurred while retrieving all videogames'});
            return;
        }

        res.status(200).send(videogames);
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getGameById = async (req, res) => {
    const { id } = req.params;

    if(!id) {
        res.status(400).send({status: "FAILED", data: { error: "Key missing or empty: 'id'" }});
    }

    try {
        const game = await Videogame.findByPk(id);

        if(!game) {
            res.status(400).send({message: "Some error occurred while retrieving videogame"})
        }     
        
        res.status(200).send(game);
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

const getGameByName = async (req, res) => {
    const { name } = req.params;

    if(!name) {
        res.status(400).send({ status: "FAILED", data: { error: "Key missing or empty: 'name'" }});
    }

    try {
        const foundedGames = await Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `${name}%`
                }
            }
        });

        if(foundedGames.length == 0) {
            res.status(404).send({message: "Some error occurred while retrieving videogames"});
        }

        res.status(200).send(foundedGames);
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

//<<-------------------- UPDATE -------------------->>

const updateStock = async (req, res) => {
    const { id, amount } = req.body;

    if(!id || !amount) {
        res.status(400).send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty: 'id', ''amount" } });
    }

    const game = await Videogame.findByPk(id);

    if(!game) {
        res.status(404).send({ message: "Some error occurred while retrieving videogame"});
    }

    const totalAmount = (game.stock - amount);

    if(totalAmount < 0) {
        res.status(400).send({ message: "Some error occurred while updating the videogame amount" });
    }

    try {
        const updatedGame = await Videogame.update({ stock: totalAmount }, {
            where: {
                id: id
            }
        })

        if(!updatedGame) {
            res.status(400).send({ message: "Some error occurred while updating the videogame amount" });
        }

        res.status(200).send(updatedGame);
    } catch(error) {
        res.status(error?.status || 500).send(error?.message || error);
    }
}

module.exports = {
    getAllGames,
    getGameById,
    getGameByName,
    updateStock
}