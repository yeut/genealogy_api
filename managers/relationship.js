'use strict';

module.exports.Register = function(db, app) {

  // GET http://127.0.0.1/relationships/42
  // Get informations about relationship of id=42
  // return: a batch of relationships
  app.get('/relationships/:id', function (req, res) {
    db.models.Relationship.findAll({ 
      where: { id: req.params.id }, //include: [dbModel.personEventType],
    }).then(r => res.json(r));
  });

};