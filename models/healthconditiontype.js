'use strict';
module.exports = (sequelize, DataTypes) => {
  const HealthConditionType = sequelize.define('HealthConditionType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'HealthConditionTypes'
  });
  HealthConditionType.associate = function(models) {
    // associations can be defined here
    HealthConditionType.HealthConditions = HealthConditionType.hasMany(models.HealthCondition); 
  };
  return HealthConditionType;
};