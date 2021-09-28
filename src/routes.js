const routes = require("express").Router();

const studentController = require("./controllers/students");


//rotas públicas
routes.post('/student', studentController.store);




module.exports = routes;
