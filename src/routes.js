const routes = require('express').Router();

const StudentController = require('./controllers/student');

const multer = require("multer");

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

const uploadImages = require('./services/firebase');

// Rota do aluno
routes.post("/student", Multer.array('images', 2), uploadImages, StudentController.store);

// routes.post("/student", Multer.single('imagem'), uploadImage, StudentController.store);


routes.get('/student/:student_id', StudentController.index);

module.exports = routes;
