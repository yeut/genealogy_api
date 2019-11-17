'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Events', // name of Source model
        'EventTypeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'EventTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.createTable(
        'PersonEvents',
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          PersonId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          EventId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        }
      ),
      queryInterface.createTable(
        'RelationshipEvents',
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          RelationshipId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          EventId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Events', // name of Source model
        'EventTypeId' // key we want to remove
      ),
      queryInterface.dropTable('PersonEvents'),
      queryInterface.dropTable('RelationshipEvents')
    ]);
  }
};