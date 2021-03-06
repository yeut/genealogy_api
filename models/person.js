'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    maidenName: DataTypes.STRING,
    familiarName: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    notes: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'Persons'
  });
  Person.associate = function(models) {    
    Person.Educations = Person.hasMany(models.Education);
    Person.Events = Person.hasMany(models.Event);
    Person.HealthConditions = Person.hasMany(models.HealthCondition);
    Person.Occupations = Person.hasMany(models.Occupation);
    Person.Relationships1 = Person.hasMany(models.Relationship, { foreignKey: 'Person1Id', as: 'Person1' });
    Person.Relationships2 = Person.hasMany(models.Relationship, { foreignKey: 'Person2Id', as: 'Person2' });
  };
  return Person;
};