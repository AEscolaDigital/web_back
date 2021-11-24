const express = require("express");
require("./database");
require("dotenv").config();
const routes = require("./routes");
const app = express();
const setupCors = require("./config/middlewares")

setupCors(app);

//dizemos para o express que ele pode aceitar json
app.use(express.json());

app.use(routes);


module.exports = app;