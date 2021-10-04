const routes = require("express").Router();
const authMiddleware = require("./middleware/autorization")

const StudentController = require("./controllers/student");
const loginController = require("./controllers/login");

//Rota de login
routes.post('/login', loginController.store);

routes.use(authMiddleware);

// Rota do aluno
routes.post('/student', StudentController.store);
routes.get('/student/:student_id', StudentController.index);


module.exports = routes;
