const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//<<-------------------- POST -------------------->>
router.post("/", userController.createUser);
router.post("/login", userController.logIn);
router.post("/wishlist", userController.addToWishlist);

//<<-------------------- GET -------------------->>
router.get("/:id", userController.getUserById);
router.get("/wishlist/:id", userController.getUserWishlist)

//<<-------------------- UPDATE -------------------->>
router.patch("/", userController.updateUser);

module.exports = router;