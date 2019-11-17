'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Sources', // name of Source model
        'RepositoryId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Repositories', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Sources', // name of Source model
        'RepositoryId' // key we want to remove
      )
    ]);
  }
};