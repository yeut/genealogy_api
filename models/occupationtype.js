'use strict';
module.exports = (sequelize, DataTypes) => {
  const OccupationType = sequelize.define('OccupationType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'OccupationTypes'
  });
  OccupationType.associate = function(models) {
    // associations can be defined here
    OccupationType.Occupations = OccupationType.hasMany(models.Occupation);
  };
  return OccupationType;
};