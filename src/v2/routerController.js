const express = require("express");
const videogamesRouter = require("./VideogamesRoutes");
const usersRouter = require("./UsersRoutes");

const initRouterController = (app) => {
    const router = express.Router();
    router.use('/games', videogamesRouter);
    router.use('/users', usersRouter);
    app.use('/api/v2/valki-games', router);
}

module.exports = { initRouterController }