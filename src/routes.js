const routes = require('express').Router();

// const studentValidators = require("./validators/students");

const StudentController = require('./controllers/student');
const UserImagesController = require('./controllers/userImage');

const multer = require("multer");

const Multer = multer({
    storange: multer.memoryStorage(),
    limits: 1024 * 1024, // 1MB
    
});

// Firebase
const uploadImages = require('./services/firebase');

const uploadfields = Multer.fields([
    { name: 'image_cpf', maxCount: 1 }, 
    { name: 'image_rg', maxCount: 1},
    { name: 'image_cpf_responsible', maxCount: 1},
    { name: 'image_proof_of_residence', maxCount: 1},
    { name: 'profile_image', maxCount: 1},

]);

// Rota do aluno
routes.post("/student", StudentController.store);
routes.get('/student/:student_id', StudentController.index);

// Rota para gravar as imagens
routes.post("/userimagens/:user_id/", uploadfields, uploadImages, UserImagesController.store);

// Rota para fazer o update da imagem de perfil dos usuários
routes.put("/userimagens/:user_id/", uploadfields, uploadImages, UserImagesController.update);

module.exports = routes;
