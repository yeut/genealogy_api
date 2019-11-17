'use strict';

module.exports.Register = function(db, app) {
  app.get('/trees/:id', function (req, res) {
    var personId = req.params.id;
    var asc = req.query.asc;
    var desc = req.query.desc;
      throw Error('Not implemented');
  });
};