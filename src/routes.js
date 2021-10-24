const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');

//Rotas públicas

//Rota da seção
routes.post('/sessions', SessionController.store);

// Rota da escola
routes.post("/schools", SchooolController.store);

routes.use(authMiddleware);

// Rota de escola
routes.get('/schools/:school_id/', SchooolController.index);



module.exports = routes;
