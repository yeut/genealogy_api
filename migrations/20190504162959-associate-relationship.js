'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Relationships', // name of Source model
        'Person1Id', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.addColumn(
        'Relationships', // name of Source model
        'Person2Id', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.addColumn(
        'Relationships', // name of Source model
        'RelationshipTypeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'RelationshipTypes', // name of Target model
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
        'Relationships', // name of Source model
        'Person1Id' // key we want to remove
      ),
      queryInterface.removeColumn(
        'Relationships', // name of Source model
        'Person2Id' // key we want to remove
      ),
      queryInterface.removeColumn(
        'Relationships', // name of Source model
        'RelationshipTypeId' // key we want to remove
      )
    ]);
  }
};