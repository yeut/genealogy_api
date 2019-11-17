'use strict';
module.exports = (sequelize, DataTypes) => {
  const Object = sequelize.define('Object', {
    path: DataTypes.STRING, // saved as file
    notes: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Objects'
  });
  Object.associate = function(models) {
  };
  return Object;
};