const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//<<-------------------- POST -------------------->>
router.post("/", userController.createUser);
router.post("/login", userController.logIn);
router.post("/wishlist", userController.addToWishlist);

//<<-------------------- GET -------------------->>
router.get("/:id", userController.getUserById);
router.get("/wishlist/:id", userController.getUserWishlist);
router.get("/cart/:id", userController.getUserCart);
router.get("/sales/:id", userController.getUserSales);

//<<-------------------- UPDATE -------------------->>
router.patch("/", userController.updateUser);

//<<-------------------- DELETE -------------------->>
//! Terminar método en el controlador
router.delete("/wishlist", userController.deleteFromWishlist);

module.exports = router;