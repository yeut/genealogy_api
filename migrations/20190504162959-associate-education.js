'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Educations', // name of Source model
        'PersonId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Persons', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ),
      queryInterface.addColumn(
        'Educations', // name of Source model
        'EducationTypeId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'EducationTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Educations', // name of Source model
        'PersonId' // key we want to remove
      ),
      queryInterface.removeColumn(
        'Educations', // name of Source model
        'EducationTypeId' // key we want to remove
      )
    ]);
  }
};