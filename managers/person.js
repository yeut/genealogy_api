'use strict';

const Op = require('sequelize').Op;

module.exports.Register = function(db, app) {

  // GET http://127.0.0.1/persons/42
  // Get informations about person of id=42
  // return: a batch of person
  app.get('/persons/:id', function (req, res) {
    console.log('GET persons/' + req.params.id);
    db.models.Person.findAll({ 
      where: { id: req.params.id }, //include: [dbModel.personEventType],
    }).then(r => res.json(r));
  });

  // POST http://127.0.0.1/persons
  // Create a new person in the db
  // return: created person
  app.post('/persons', function (req, res) {
    console.log('POST persons');
    db.models.Person.create(req.body)
      .then(r => res.json(r));
  });

  // PUT http://127.0.0.1/persons/merge
  // Merge multiple persons
  // return: delete count
  app.put('/persons/merge', function (req, res) {
    console.log('PUT /persons/merge');
    console.log(req.body);

    var mergedId = req.body[0];
    req.body.splice(0, 1);

    req.body.forEach(element => {
      // update relationships
      db.models.Relationship.update({Person1Id: mergedId}, {where: {Person1Id: element}});
      // update educations
      db.models.Education.update({PersonId: mergedId}, {where: {PersonId: element}});
      // update events
      db.models.Event.update({personId: mergedId}, {where: {PersonId: element}});
      // update occupations
      db.models.Occupation.update({PersonId: mergedId}, {where: {PersonId: element}});
      // delete persons
      db.models.Person.destroy({where: {id: element}});
    }).then(res.json(req.body.length));
  });

  // PUT http://127.0.0.1/persons/42
  // Update person of id=42
  // return: update count
  app.put('/persons/:id', function (req, res) {
    console.log('PUT persons/' + req.params.id);
    req.body.id = undefined;
    db.models.Person.update(req.body, {where: {id: req.params.id}})
      .then(r => res.json(r));
  });

  // DELETE http://127.0.0.1/persons/42
  // Delete person of id=42
  // return: delete count
  app.delete('/persons/:id', function (req, res) {
    console.log('DELETE persons/' + req.params.id);
    db.models.Person.destroy({where: {id: req.params.id}})
      .then(r => res.json(r));
  });
  
  // GET http://127.0.0.1/person?name=mathieu_roux
  // Search a list of person with name (mandatory)
  // '_' is separated field
  // return: a btach of person
  app.get('/persons', function (req, res) {
    console.log('GET persons');
    var andCond = [{}];
    req.query.name.split('_').forEach(element => {
      var orCond = [{}];
      orCond.push({firstName: {[Op.like]: element}});
      orCond.push({lastName: {[Op.like]: element}});
      orCond.push({middleName: {[Op.like]: element}});
      orCond.push({maidenName: {[Op.like]: element}});
      orCond.push({familiarName: {[Op.like]: element}});
      andCond.push({[Op.or]: orCond})
    });
    db.models.Person.findAll({where: {[Op.and]: andCond}})
      .then(r => res.json(r));
  });
}