const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Students = require("../models/Students");
const Adresses = require("../models/Adresses");
const Genres = require("../models/Genres");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
Students.init(connection);
Adresses.init(connection);
Genres.init(connection);

Students.associate(connection.models);
Adresses.associate(connection.models);
Genres.associate(connection.models);

module.exports = connection;