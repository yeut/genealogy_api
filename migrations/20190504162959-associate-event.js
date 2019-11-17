'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([      
      queryInterface.addColumn(
        'Events', // name of Source model
        'PersonId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: true,
        }
      ),    
      queryInterface.addColumn(
        'Events', // name of Source model
        'RelationshipId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Relationships', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: true,
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Events', // name of Source model
        'PersonId' // key we want to remove
      ),
      queryInterface.removeColumn(
        'Events', // name of Source model
        'RelationshipId' // key we want to remove
      )
    ]);
  }
};