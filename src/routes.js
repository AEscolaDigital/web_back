const express = require('express');

const StudentController = require("./controllers/student");
const GenreController = require("./controllers/genre")


const routes = require("express").Router();


//rotas públicas
routes.get('/student/:student_id/genre', GenreController.index);
routes.post('/student', StudentController.store);




module.exports = routes;
