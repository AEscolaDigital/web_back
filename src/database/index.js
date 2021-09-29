const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Students = require("../models/Students");
const Genres = require("../models/Genres");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
Students.init(connection);
Genres.init(connection);


module.exports = connection;