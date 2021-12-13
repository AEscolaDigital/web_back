
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("notes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      note_1:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note_2:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note_3:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note_4:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      semester:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assessment:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      discipline_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'disciplines', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      class_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'classes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    queryInterface.dropTable("notes");
  }
};