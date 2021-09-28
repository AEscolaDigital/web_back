const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Students = require("../models/Students");

const connection = 
    new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
Students.init(connection);


module.exports = connection;