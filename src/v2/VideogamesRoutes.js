const express = require('express');
const router = express.Router();
const gameController = require("../controllers/gameController");
const fileController = require("../controllers/fileController");
const { upload } = require("../config/multer.config")

//<<-------------------- POST -------------------->>
router.post("/", upload.single("file"), fileController.fileUpload);

//<<-------------------- GET -------------------->>
router.get("/", gameController.getAllGames);
router.get("/ranking", gameController.getGamesRanking );
router.get("/best-selling", gameController.getBestSellingGenres);
router.get("/:id", gameController.getGameById);
router.get("/search/:name", gameController.getGameByName);

//<<-------------------- UPDATE -------------------->>
router.patch("/", gameController.updateGame);
router.patch("/stock", gameController.updateStock);

//<<-------------------- DELETE -------------------->>
router.delete("/:id", gameController.deleteGame);

module.exports = router;