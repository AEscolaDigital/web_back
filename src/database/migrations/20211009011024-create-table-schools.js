'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("schools", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name_school:{
        type: Sequelize.STRING,
        allowNull: false
      }, 
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      school_size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },     
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("schools");
  }
};

