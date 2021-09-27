'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("estados", {
      idEstado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
      queryInterface.dropTable("estados");
  }
};
