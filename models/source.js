'use strict';
module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Sources'
  });
  Source.associate = function(models) {
    // associations can be defined here
    Source.Repository = Source.belongsTo(models.Repository);
    Source.SourceType = Source.belongsTo(models.SourceType);    
  };
  return Source;
};