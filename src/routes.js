const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');
const ClassesController = require('./controllers/classes');

const multer = require('multer');

const MulterCSV = multer();

const MulterCSVClass = multer();

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

routes.post('/users', UserController.store);
routes.post('/users/excelFile', MulterCSV.single("fileCSV"), UserController.storeExcelFile);
routes.get('/users/page/:page_number', UserController.index);
routes.put('/users', Multer.single("imagem"), UserController.update);


routes.get('/classes/:page_number', ClassesController.index);
routes.get('/classes/:search', ClassesController.indexSearch);
routes.get('/classes/page/:page_number', ClassesController.indexUsers);
routes.post('/classes', ClassesController.store);
routes.post('/classes/addMember/:class_id', ClassesController.storeMember);
routes.post('/classes/addMember',  Multer.single("fileCSV"), ClassesController.storeExcelFile);
routes.delete('/classes/:class_id', ClassesController.delete);
routes.delete('/classes/deleteMember/:class_id', ClassesController.deleteClassMember);




module.exports = routes;
