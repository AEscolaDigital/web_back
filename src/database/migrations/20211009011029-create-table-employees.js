'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("employees", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      genre_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'genres', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      }, 
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valid: {
        type: Sequelize.INTEGER,
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
    queryInterface.dropTable("employees");
  }
};

