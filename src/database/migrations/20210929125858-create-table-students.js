'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("students", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_rg: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_cpf: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cpf_responsible: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_cpf_responsible: {
        type: Sequelize.STRING,
        allowNull: true
      },
      valid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      img_proof_of_residence: {
        type: Sequelize.STRING,
        allowNull: true
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {         // Student belongsTo genre 1:1
        //   model: 'genres', key: 'id'
        // }
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
    queryInterface.dropTable("students");
  }
};



