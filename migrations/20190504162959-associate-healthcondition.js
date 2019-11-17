'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'HealthConditions', // name of Source model
        'PersonId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
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
        'HealthConditions', // name of Source model
        'PersonId' // key we want to remove
      )
    ]);
  }
};