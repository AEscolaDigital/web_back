const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const School = require("../models/School");
const Address = require("../models/Address");
const Phone = require("../models/Phone");
const Prefixe = require("../models/Prefixe");
const Citie = require("../models/Citie");
const State = require("../models/State");
const Role = require("../models/Role");
const User = require("../models/User");
const Classe = require("../models/Class");


const connection = new Sequelize(dbConfig.url, dbConfig.config);

//inicializando os models
School.init(connection);
Address.init(connection);
Phone.init(connection);
Prefixe.init(connection);
Citie.init(connection);
State.init(connection);
Role.init(connection);
User.init(connection);
Classe.init(connection);

School.associate(connection.models);
Address.associate(connection.models);
Citie.associate(connection.models);
State.associate(connection.models);
Phone.associate(connection.models);
Prefixe.associate(connection.models);
User.associate(connection.models);
Classe.associate(connection.models);



module.exports = connection;