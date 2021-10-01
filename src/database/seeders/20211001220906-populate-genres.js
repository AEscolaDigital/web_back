'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genres',
    [
      {
        name: 'Masculino',
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        name: 'Feminino',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genres', null);
  }
};
