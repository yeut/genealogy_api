'use strict';
module.exports = (sequelize, DataTypes) => {
  const HealthCondition = sequelize.define('HealthCondition', {
    description: DataTypes.STRING,
    begin: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
    notes: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'HealthConditions'
  });
  HealthCondition.associate = function(models) {
    HealthCondition.Person = HealthCondition.belongsTo(models.Person);
  };
  return HealthCondition;
};