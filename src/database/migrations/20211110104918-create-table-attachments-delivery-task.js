
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("attachments_delivery_task", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link1: {
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
      task_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tasks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
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
    queryInterface.dropTable("attachments_delivery_task");
  }
};