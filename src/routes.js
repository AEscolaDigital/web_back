const routes = require("express").Router();

const StudentController = require("./controllers/student");
const AddressController = require("./controllers/address");
const GenreController = require("./controllers/genre");

routes.get('student/:student_id/genre', GenreController.index);

routes.post('/student', StudentController.store);

routes.get('/student/:student_id/address', AddressController.index);
routes.post('/student/:student_id/address', AddressController.store);


module.exports = routes;
