const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');

const multer = require('multer');

const MulterCSV = multer();

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

//Rotas públicas
routes.post('/sessions', SessionController.store);

routes.post("/schools", SchooolController.store);


routes.use(authMiddleware);
// Rotas privadas

routes.get('/schools/:school_id/', SchooolController.index);

routes.post('/users', MulterCSV.single("fileCSV"), UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', Multer.single("imagem"), UserController.update);




module.exports = routes;
