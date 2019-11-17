'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    date: DataTypes.STRING,
    address: DataTypes.STRING,
    notes: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Events'
  });
  Event.associate = function(models) {
    Event.Persons = Event.belongsTo(models.Person);
    Event.Relationships = Event.belongsTo(models.Relationship);    
  };
  return Event;
};