const express = require('express');
const { json } = express;
const { connection } = require('./database/connection');
const { initRouterController } = require("./v2/routerController");
require('./database/associations');
// require('dotenv').config();


const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

initRouterController(app);
connection();

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(process.env.STRIPE_SECRET_KEY);
    console.log(`Servidor activo en el puerto ${PORT}`);
}) 