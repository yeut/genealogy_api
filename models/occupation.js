'use strict';
module.exports = (sequelize, DataTypes) => {
  const Occupation = sequelize.define('Occupation', {
    begin: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
    notes: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Occupations'
  });
  Occupation.associate = function(models) {
    // associations can be defined here
    Occupation.Person = Occupation.belongsTo(models.Person);
    Occupation.OccupationType = Occupation.belongsTo(models.OccupationType);    
  };
  return Occupation;
};