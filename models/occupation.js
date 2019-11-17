'use strict';
module.exports = (sequelize, DataTypes) => {
  const Occupation = sequelize.define('Occupation', {
    begin: DataTypes.STRING,
    end: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
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