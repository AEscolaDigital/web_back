const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization");
const is = require('./middleware/permission');

const SessionController = require('./controllers/sessions');
const SchooolController = require('./controllers/schools');
const UserController = require('./controllers/users');
const ClassesController = require('./controllers/classes');
const DisciplineController = require('./controllers/disciplines');
const TakController = require('./controllers/tasks');


const uploadImage = require('./services/firebase');
const uploadTask = require('./services/firebaseTask');

const multer = require('multer');
const Taskdelivery = require('./controllers/Taskdelivery');

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

const uploadfields = Multer.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
]);

//Rotas públicas
routes.post('/sessions', SessionController.store);

routes.post("/schools", SchooolController.store);


routes.use(authMiddleware);

// Rotas privadas
routes.get('/schools/:school_id/', SchooolController.index);

routes.post('/users', UserController.store);
routes.post('/users/excelFile', Multer.single("fileCSV"), UserController.storeExcelFile);
routes.get('/users/page/:page_number', UserController.index);
routes.put('/users', Multer.single("image"), uploadImage, UserController.update);

routes.get('/classes/:page_number', is(["ROLE_ADMIN", "ROLE_TEACHER"]), ClassesController.index);
routes.get('/classes/search/:search', is(["ROLE_ADMIN", "ROLE_TEACHER"]), ClassesController.indexSearch);
routes.get('/classes/:class_id/page/:page_number', is(["ROLE_ADMIN"]), ClassesController.indexUsers);
routes.post('/classes', is(["ROLE_ADMIN"]), ClassesController.store);
routes.post('/classes/addMember/:class_id', is(["ROLE_ADMIN"]), ClassesController.storeMember);
routes.post('/classes/addMembers/excelFile', is(["ROLE_ADMIN"]), Multer.single("fileCSV"), ClassesController.storeExcelFile);
routes.delete('/classes/:class_id', is(["ROLE_ADMIN"]), ClassesController.delete);
routes.delete('/classes/deleteMember/:class_id/:user_id', is(["ROLE_ADMIN"]), ClassesController.deleteClassMember);

routes.get('/disciplines',DisciplineController.index);
routes.post('/disciplines', Multer.single("image"), is(["ROLE_ADMIN", "ROLE_TEACHER"]), uploadImage, DisciplineController.store);
routes.delete('/disciplines/:id', is(["ROLE_ADMIN", "ROLE_TEACHER"]), DisciplineController.delete);


routes.get('/tasks/list/:discipline_id', TakController.index);
routes.get('/tasks/:task_id', TakController.indexListTask);
routes.get('/tasks/users/:task_id', is(["ROLE_ADMIN", "ROLE_TEACHER"]), TakController.indexListUserTask);
routes.post('/tasks/:discipline_id', is(["ROLE_ADMIN", "ROLE_TEACHER"]), uploadfields, uploadTask, TakController.store);

routes.get('/taskdelivery/user_id/:user_id/:task_id', is(["ROLE_ADMIN", "ROLE_TEACHER"]), Taskdelivery.index);
routes.post('/taskdelivery', uploadfields, Taskdelivery.store);
// routes.put('/taskdelivery',
//     uploadfields,
//     Taskdelivery.update);




module.exports = routes;
