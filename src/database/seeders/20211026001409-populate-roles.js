'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles',
    [
      {
        //id - 1
        name: 'ROLE_ADMIN',
        description: 'Pode ultilizar é acessar todos os recusros',
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        //id - 2
        name: 'ROLE_USER',
        description: 'Não poder adicionar novos usuários, criar diciplinas, turmas e tarefas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id - 3
        name: 'ROLE_TEACHER',
        description: 'Só não poder adicionar novos membros na plataforma',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null);
  }
};