'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("alunos", {
      idAluno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataNascimento: {
        type: Sequelize.DATE,
         allowNull: false
      },
      valido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipoUsuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpfResponsavel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataCriacaoConta: {
        type: Sequelize.DATE,
        allowNull: false
      },
      genero: {
        type: Sequelize.DATE,
         allowNull: false
      }     
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("alunos");
  }
};

