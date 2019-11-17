'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Occupations', // name of Source model
        'PersonId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Occupations', // name of Source model
        'PersonId' // key we want to remove
      )
    ]);
  }
};