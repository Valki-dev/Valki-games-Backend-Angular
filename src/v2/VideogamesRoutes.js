const express = require('express');
const router = express.Router();
const gameController = require("../controllers/gameController");

//<<-------------------- POST -------------------->>
//<<-------------------- GET -------------------->>
router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);
router.get("/search/:name", gameController.getGameByName);
//<<-------------------- UPDATE -------------------->>
router.patch("/", gameController.updateGame)
router.patch("/stock", gameController.updateStock);
//<<-------------------- DELETE -------------------->>
router.delete("/:id", gameController.deleteGame)

module.exports = router;