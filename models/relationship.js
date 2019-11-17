'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    notes: DataTypes.STRING,    
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'Relationships'
  });
  Relationship.associate = function(models) {
    Relationship.Person1 = Relationship.belongsTo(models.Person, { foreignKey: 'id' });
    Relationship.Person2 = Relationship.belongsTo(models.Person, { foreignKey: 'id' });
    Relationship.Events = Relationship.hasMany(models.Event);    
  };
  return Relationship;
};