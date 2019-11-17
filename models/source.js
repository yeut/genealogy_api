'use strict';
module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
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
    tableName: 'Sources'
  });
  Source.associate = function(models) {
    Source.Repository = Source.belongsTo(models.Repository);
  };
  return Source;
};