'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Repositories', // name of Source model
        'RepositoryTypeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'RepositoryTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Repositories', // name of Source model
        'RepositoryTypeId' // key we want to remove
      );
  }
};