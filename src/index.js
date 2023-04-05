const express = require('express');
const { json } = express;

const { connection } = require('./database/connection.js');

const cors = require('cors');

const { initRouterController } = require("./v2/routerController");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

initRouterController(app);

app.listen(PORT, () => {
    connection()
    console.log(`Servidor activo en el puerto ${PORT}`);
})