const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');
const ClassesController = require('./controllers/classes');
const DisciplineController = require('./controllers/disciplines');
const TakController = require('./controllers/Tasks');


const uploadImage = require('./services/firebase');

const multer = require('multer');

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
routes.post('/users/excelFile', Multer.single("fileCSV"), UserController.storeExcelFile);
routes.get('/users/page/:page_number', UserController.index);
routes.put('/users',
    Multer.single("image"),
    uploadImage,
    UserController.update);

routes.get('/classes/:page_number', ClassesController.index);
routes.get('/classes/search/:search', ClassesController.indexSearch);
routes.get('/classes/:class_id/page/:page_number', ClassesController.indexUsers);
routes.post('/classes', ClassesController.store);
routes.post('/classes/addMember/:class_id', ClassesController.storeMember);
routes.post('/classes/addMembers/excelFile', Multer.single("fileCSV"), ClassesController.storeExcelFile);
routes.delete('/classes/:class_id', ClassesController.delete);
routes.delete('/classes/deleteMember/:class_id/:user_id', ClassesController.deleteClassMember);

routes.get('/disciplines', DisciplineController.index);
routes.post('/disciplines',
    Multer.single("image"),
    uploadImage,
    DisciplineController.store);
routes.delete('/disciplines/:id', DisciplineController.delete);


routes.get('/tasks/:discipline_id', TakController.index);
routes.post('/tasks/:discipline_id',
    Multer.single("image"),
    TakController.store);




module.exports = routes;
