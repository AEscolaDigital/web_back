'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genres', [
    {
      name_genre: 'Masculino',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name_genre: 'Feminino',
      created_at: new Date(),
      updated_at: new Date(),
    }
  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genres', null);
  }
};
