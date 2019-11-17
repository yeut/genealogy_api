'use strict';
module.exports = (sequelize, DataTypes) => {
  const RepositoryType = sequelize.define('RepositoryType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'RepositoryTypes'
  });
  RepositoryType.associate = function(models) {
    // associations can be defined here
    RepositoryType.Repositories = RepositoryType.hasMany(models.Repository);
  };
  return RepositoryType;
};