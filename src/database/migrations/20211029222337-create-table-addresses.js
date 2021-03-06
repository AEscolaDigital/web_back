'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      school_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'schools', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      city_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      state_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'states', key: 'id' },
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
    queryInterface.dropTable("addresses");
  }
};
