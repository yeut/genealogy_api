'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    description: DataTypes.STRING,
    institution: DataTypes.STRING,
    field: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Educations'
  });
  Education.associate = function(models) {
    // associations can be defined here
    Education.Person = Education.belongsTo(models.Person);
    Education.EducationType = Education.belongsTo(models.EducationType);
  };
  return Education;
};