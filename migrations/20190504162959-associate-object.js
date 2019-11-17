'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Objects', // name of Source model
        'ObjectTypeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'ObjectTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Objects', // name of Source model
        'ObjectTypeId' // key we want to remove
      );
  }
};