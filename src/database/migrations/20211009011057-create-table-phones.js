
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("phones", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      employee_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'employees', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      responsible_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'responsibles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ddd_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prefixes', key: 'id' },
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
    queryInterface.dropTable("phones");
  }
};