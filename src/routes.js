const routes = require('express').Router();

const authMiddleware = require("./middleware/autorization")

const SessionController = require('./controllers/sessions');
const StudentController = require('./controllers/student');
const StudentImagesController = require('./controllers/StudentImage');
const EmployeeController = require('./controllers/employee');
const EmployeeImageController = require('./controllers/EmployeeImage');
const ResponsibleController = require('./controllers/responsible');
const ResponsibleImageController = require('./controllers/ResponsibleImage');

const multer = require('multer');

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

// Firebase
const uploadImagesStudent = require('./services/firebaseStudent');
const uploadImagesEmployee = require('./services/firebaseEmployee');
const uploadImagesResponsible = require('./services/firebaseResponsible')

const uploadfields = Multer.fields([
    { name: 'image_cpf', maxCount: 1 }, 
    { name: 'image_rg', maxCount: 1},
    { name: 'image_cpf_responsible', maxCount: 1},
    { name: 'image_proof_of_residence', maxCount: 1},
    { name: 'profile_image', maxCount: 1},
]);


//Rotas públicas

//Rota da seção
routes.post('/sessions', SessionController.store);

// Rota do aluno
routes.post("/students", StudentController.store);

routes.post("/students/:student_id/imagens/", uploadfields, uploadImagesStudent, StudentImagesController.store);

// Rota do funcionário
routes.post("/employees", EmployeeController.store);

routes.post("/employees/:employee_id/imagens/", uploadfields, uploadImagesEmployee, EmployeeImageController.store);

// Rota do Responsável
routes.post("/responsibles", ResponsibleController.store);

routes.post("/responsibles/:responsible_id/imagens/", uploadfields, uploadImagesResponsible, ResponsibleImageController.store);

routes.use(authMiddleware);


//Rotas privadas

// Rota de alunos
routes.get('/students/:student_id', StudentController.index);

routes.put("/students/:student_id/imagens/", uploadfields, uploadImagesStudent, StudentImagesController.update);

// Rota do funcionário
routes.get("/employees/:employee_id", EmployeeController.index);

routes.put("/employees/:employee_id/imagens/", uploadfields, uploadImagesEmployee, EmployeeImageController.update);

// Rota do Responsável
routes.get("/responsibles/:responsible_id", ResponsibleController.index);

routes.put("/responsibles/:responsible_id/imagens/", uploadfields, uploadImagesResponsible, ResponsibleImageController.update);


module.exports = routes;
