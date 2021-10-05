const routes = require('express').Router();

// Controllers
const StudentController = require('./controllers/student');

// Validações
const studentValidators = require("./validators/students");

const multer = require("multer");

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});


// Firebase
const uploadImages = require('./services/firebase');

// Rota do aluno
routes.post("/student", studentValidators.create, Multer.array('images', 2), uploadImages, StudentController.store);

// routes.post("/student", Multer.single('imagem'), uploadImage, StudentController.store);


routes.get('/student/:student_id', StudentController.index);

module.exports = routes;
