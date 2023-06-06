const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//<<-------------------- POST -------------------->>
router.post("/", userController.createUser);
router.post("/login", userController.logIn);
router.post("/wishlist", userController.addToWishlist);
router.post("/cart", userController.addToCart);
router.post("/sales", userController.addToSales);
router.post("/payment", userController.payment);

//<<-------------------- GET -------------------->>
router.post("/password", userController.comparePassword)
router.get("/:id", userController.getUserById);
router.get("/wishlist/:id", userController.getUserWishlist);
router.get("/cart/:id", userController.getUserCart);
router.get("/sales/:id", userController.getUserSales);
router.get("/order/:orderNumber", userController.getSaleByOrderNumber)

//<<-------------------- UPDATE -------------------->>
router.patch("/", userController.updateUser);
router.patch("/cart", userController.updateAmount);
router.patch("/password", userController.updatePassword)
router.patch("/verification", userController.verifyAccount)

//<<-------------------- DELETE -------------------->>
router.delete("/:id", userController.deleteUser);
router.delete("/wishlist/:userId", userController.deleteFromWishlist);
router.delete("/cart/:userId", userController.deleteFromCart);

module.exports = router;