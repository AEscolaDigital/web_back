'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("adresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      district:{
        type: Sequelize.STRING,
        allowNull: false
      },
      complement:{
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("adresses");
  }
};



