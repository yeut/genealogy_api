'use strict';
module.exports = (sequelize, DataTypes) => {
  const ObjectType = sequelize.define('ObjectType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'ObjectTypes'
  });
  ObjectType.associate = function(models) {
    // associations can be defined here
    ObjectType.Objects = ObjectType.hasMany(models.Object);
  };
  return ObjectType;
};