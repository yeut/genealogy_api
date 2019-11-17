'use strict';
module.exports = (sequelize, DataTypes) => {
  const HealthCondition = sequelize.define('HealthCondition', {
    begin: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
    notes: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'HealthConditions'
  });
  HealthCondition.associate = function(models) {
    // associations can be defined here
    HealthCondition.Person = HealthCondition.belongsTo(models.Person);
    HealthCondition.HealthConditionType = HealthCondition.belongsTo(models.HealthConditionType);    
  };
  return HealthCondition;
};