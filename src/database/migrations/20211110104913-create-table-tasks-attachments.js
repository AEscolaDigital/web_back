
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("tasks_attachments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      task_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tasks', key: 'id' },
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
    queryInterface.dropTable("tasks_attachments");
  }
};