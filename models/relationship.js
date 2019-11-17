'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    notes: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Relationships'
  });
  Relationship.associate = function(models) {
    // associations can be defined here
    Relationship.Person1 = Relationship.belongsTo(models.Person, { foreignKey: 'person1Id' });
    Relationship.Person2 = Relationship.belongsTo(models.Person, { foreignKey: 'person2Id' });
    Relationship.RelationshipType = Relationship.belongsTo(models.RelationshipType);
    Relationship.Events = Relationship.hasMany(models.Event);    
  };
  return Relationship;
};