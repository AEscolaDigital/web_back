
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("grades", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      grade_1:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      grade_2:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      grade_3:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      grade_4:{
        type: Sequelize.INTEGER,
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
    queryInterface.dropTable("tasks_users");
  }
};