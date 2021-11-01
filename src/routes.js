const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');
const ClassesController = require('./controllers/classes');

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
routes.get('/users/page/:page_number', UserController.index);
routes.put('/users', Multer.single("imagem"), UserController.update);

routes.get('/classes', ClassesController.index);
routes.get('/classes/:class_id', ClassesController.indexUsers);
routes.post('/classes', ClassesController.store);
routes.post('/classes/addMember', ClassesController.storeAddMember);


module.exports = routes;
