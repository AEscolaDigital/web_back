'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("user_images", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image_rg:{
        type: Sequelize.STRING,
        allowNull: false
      },
      image_cpf:{
        type: Sequelize.STRING,
        allowNull: false
      },
      image_cpf_responsible: {
        type: Sequelize.STRING,
        allowNull: true
      },
      img_proof_of_residence:{
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true
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
    queryInterface.dropTable("user_images");
  }
};
