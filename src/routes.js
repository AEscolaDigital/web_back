const routes = require("express").Router();

const StudentController = require("./controllers/student");


// Rota do aluno
routes.post('/student', StudentController.store);
routes.get('/student/:student_id', StudentController.index);

module.exports = routes;
