const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');
//Rotas públicas

//Rota da seção
routes.post('/sessions', SessionController.store);

// Rota da escola
routes.post("/schools", SchooolController.store);

routes.use(authMiddleware);

// Rota de escola
routes.get('/schools/:school_id/', SchooolController.index);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);



module.exports = routes;
