const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Students = require("../models/Students");
const Adresses = require("../models/Adresses");
const Cities = require("../models/Cities");
const States = require("../models/States");
const Genres = require("../models/Genre");
const Phones = require("../models/Phones");
const Prefixes = require("../models/Prefixes");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
Students.init(connection);
Adresses.init(connection);
Cities.init(connection);
States.init(connection);
Genres.init(connection);
Phones.init(connection);
Prefixes.init(connection);

Students.associate(connection.models);
Adresses.associate(connection.models);
Cities.associate(connection.models);
States.associate(connection.models);
Phones.associate(connection.models);
Prefixes.associate(connection.models);

module.exports = connection;