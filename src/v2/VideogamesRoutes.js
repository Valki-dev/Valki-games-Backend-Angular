const express = require('express');
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);
router.get("/search/:name", gameController.getGameByName);
router.patch("/", gameController.updateStock);
module.exports = router;