'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Repositorys'
  });
  Repository.associate = function(models) {
    // associations can be defined here
    Repository.RepositoryType = Repository.belongsTo(models.RepositoryType); 
    Repository.Sources = Repository.hasMany(models.Source); 
  };
  return Repository;
};