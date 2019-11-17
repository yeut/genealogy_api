'use strict';
module.exports = (sequelize, DataTypes) => {
  const SourceType = sequelize.define('SourceType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'SourceTypes'
  });
  SourceType.associate = function(models) {
    // associations can be defined here
    SourceType.Sources = SourceType.hasMany(models.Source);
  };
  return SourceType;
};