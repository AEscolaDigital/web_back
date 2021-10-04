const routes = require("express").Router();

const StudentController = require("./controllers/student");
const loginController = require("./controllers/login");


// Rota do aluno
routes.post('/student', StudentController.store);
routes.get('/student/:student_id', StudentController.index);

//Rota de login
routes.post('/login', loginController.store);

module.exports = routes;
