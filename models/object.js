'use strict';
module.exports = (sequelize, DataTypes) => {
  const Object = sequelize.define('Object', {
    path: DataTypes.STRING, // saved as file
    notes: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Objects'
  });
  Object.associate = function(models) {
    // associations can be defined here
    Object.ObjectType = Object.belongsTo(models.ObjectType);  
  };
  return Object;
};