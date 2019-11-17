'use strict';
module.exports = (sequelize, DataTypes) => {
  const EducationType = sequelize.define('EducationType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'EducationTypes'
  });
  EducationType.associate = function(models) {
    // associations can be defined here
    EducationType.Educations = EducationType.hasMany(models.Education);
  };
  return EducationType;
};