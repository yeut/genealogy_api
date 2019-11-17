'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Repositories'
  });
  Repository.associate = function(models) {
    Repository.Sources = Repository.hasMany(models.Source); 
  };
  return Repository;
};