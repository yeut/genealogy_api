'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    description: DataTypes.STRING,
    institution: DataTypes.STRING,
    field: DataTypes.STRING,
    notes: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Educations'
  });
  Education.associate = function(models) {
    Education.Person = Education.belongsTo(models.Person);
  };
  return Education;
};