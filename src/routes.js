const routes = require('express').Router();

const StudentController = require('./controllers/student');

const multer = require("multer");

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

const uploadImage = require('./services/firebase');
//const uploadImageRG = require('./services/firebaserg');

const uploadfields = Multer.fields([{name: 'imagen', maxCount: 1}, { name: 'rg', maxCount: 1 }]);


// Rota do aluno
routes.post("/student", uploadfields, uploadImage, StudentController.store);

// routes.post("/student", Multer.single('imagem'), uploadImage, StudentController.store);


routes.get('/student/:student_id', StudentController.index);

module.exports = routes;
