const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Students = require("../models/Students");
const Adresses = require("../models/Adresses");
const Cities = require("../models/Cities");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
Students.init(connection);
Adresses.init(connection);
Cities.init(connection);

Students.associate(connection.models);
Adresses.associate(connection.models);

module.exports = connection;