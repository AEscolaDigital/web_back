const routes = require('express').Router();

const StudentController = require('./controllers/student');

const multer = require("multer");

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
});

const uploadImages = require('./services/firebase');

const uploadfields = Multer.fields([
    // { name: 'image_cpf', maxCount: 1 }, 
    { name: 'image_rg', maxCount: 1},
    // { name: 'image_cpf_responsible', maxCount: 1},
    // { name: 'image_proof_of_residence', maxCount: 1},
]);

// Rota do aluno
routes.post("/student", uploadfields, uploadImages, StudentController.store);
routes.get('/student/:student_id', StudentController.index);

module.exports = routes;
