'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    date: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    notes: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'Events'
  });
  Event.associate = function(models) {
    // associations can be defined here
    Event.EventType = Event.belongsTo(models.EventType);
    Event.Persons = Event.belongsToMany(models.Person, {through: 'PersonEvents'});
    Event.Relationships = Event.belongsToMany(models.Relationship, {through: 'RelationshipEvents'});    
  };
  return Event;
};