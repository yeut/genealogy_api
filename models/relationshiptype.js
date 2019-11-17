'use strict';
module.exports = (sequelize, DataTypes) => {
  const RelationshipType = sequelize.define('RelationshipType', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    unique: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true,
    tableName: 'RelationshipTypes'
  });
  RelationshipType.associate = function(models) {
    // associations can be defined here
    RelationshipType.Relationships = RelationshipType.hasMany(models.Relationship);
  };
  return RelationshipType;
};