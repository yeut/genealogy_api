'use strict';
module.exports = (sequelize, DataTypes) => {
  const Occupation = sequelize.define('Occupation', {
    begin: DataTypes.DATEONLY,
    end: DataTypes.DATEONLY,
    notes: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Occupations'
  });
  Occupation.associate = function(models) {
    Occupation.Person = Occupation.belongsTo(models.Person);  
  };
  return Occupation;
};