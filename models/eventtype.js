'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'EventTypes'
  });
  EventType.associate = function(models) {
    // associations can be defined here
    EventType.Events = EventType.hasMany(models.Event);
  };
  return EventType;
};