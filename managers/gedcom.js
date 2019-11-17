'use strict';

var upload = require('multer')();

module.exports.Register = function(db, app) {
  app.get('/gedcom/:id', function (req, res) {
      throw Error('Not implemented');
  });
    
  // POST http://127.0.0.1/gedcom
  // /!\ - no content type = json
  //     - body type = form-data
  //     - body key = 'gedcom'
  app.post('/gedcom', upload.single('gedcom'), function (req, res) {
    console.log('Import gedcom file ' + req.file.originalname);
    var data = Import(req.file.buffer.toString());
    var promPerson = [];
    var promRelation = [];
    var result = {
      persons: data.persons.length,
      relationships: data.relationships.length,
      events: 0,
      occupations: 0,
      educations: 0,
      healthconditions: 0
    };
  
    data.persons.forEach(person => {
      result.events += person.Events.length;
      result.occupations += person.Occupations.length;
      //result.educations += person.Events.length;
      //result.healthconditions += person.Events.length;
      promPerson.push(db.models.Person.create(person, {
          include: [
            {association: db.models.Person.Events},
            {association: db.models.Person.Occupations},
            {association: db.models.Person.HealthConditions},
            {association: db.models.Person.Educations},
          ]
        }).then(p => person.id = p.id))
      });
    
    Promise.all(promPerson).then(() => {      
      data.relationships.forEach(r => {
        r.Person1Id = r.Person1.id;
        r.Person2Id = r.Person2.id;
        promRelation.push(db.models.Relationship.create(r, {
          include: [{association: db.models.Relationship.Events}]
        }));        
      });
    });    

    Promise.all(promRelation).then(() => res.json(result));
  });
};

/*
0 HEAD
1 SOUR HEREDIS 14 PC
2 VERS 14
2 NAME HEREDIS PC
2 CORP BSD Concept ©
3 ADDR www.heredis.com
1 DATE 1 OCT 2018
2 TIME 21:28:31
1 GEDC
2 VERS 5.5
2 FORM LINEAGE-LINKED
1 CHAR ANSI
1 PLAC
2 FORM Town , Area code , County , Region , Country, Subdivision
1 SUBM @S0@
0 @S0@ SUBM
1 ADDR 
0 @1I@ INDI
1 NAME Jean/ACHARD/
2 GIVN Jean
2 SURN ACHARD
1 SEX M
1 OCCU Laboureur
1 FAMS @572U@
1 _FIL LEGITIMATE_CHILD
0 @2I@ INDI
1 NAME Jeanne Marie/ACHARD/
2 GIVN Jeanne Marie
2 SURN ACHARD
1 SEX F
1 BIRT
2 DATE 1738
2 _FNA NO
1 FAMS @578U@
1 FAMC @572U@
1 _FIL LEGITIMATE_CHILD
0 @578U@ FAM
1 HUSB @11I@
1 WIFE @2I@
1 CHIL @7I@
1 MARR
2 DATE 27 JUN 1763
2 PLAC Bellegarde en Forez,42210,42,,,
2 _FNA NO
1 _UST MARRIED
*/
function Import(data) {
  var tree = GetGedComTree(data);
  var result = {
    persons: [],
    relationships: []
  }
  var personsDic = [];
  
  tree.forEach(function (el) {
    switch(el.value)
    {
      case 'INDI':
        var pers = GetPerson(el);
        result.persons.push(pers);
        personsDic[pers.gedcomId] = pers;
        break;
      case 'FAM' :
        var fam = GetFamily(el);
        if(fam.husb != undefined && fam.wife != undefined)
          result.relationships.push({
            type: 'couple',
            Person1: personsDic[fam.husb],
            Person2: personsDic[fam.wife],
            Events: fam.Events
          });
        fam.childs.forEach(c => {
          if(fam.husb != undefined)
            result.relationships.push({
              type: 'parent',
              Person1: personsDic[fam.husb],
              Person2: personsDic[c],
            });
          if(fam.wife != undefined)
            result.relationships.push({
              type: 'parent',
              Person1: personsDic[fam.wife],
              Person2: personsDic[c],
            });
        });
        break;
      default:
        console.log('Unknown item Type [' + el.value + ']');
        break;
    }
  });
  return result;
}

var PersonEvents = [];
PersonEvents['BIRT'] = 'birth';
PersonEvents['DEAT'] = 'death';

var RelationshipEvents = [];
RelationshipEvents['MARR'] = 'marriage';

function GetPerson(item) {
  var pers = { 
    gedcomId: item.key, 
    Events: [],
    Occupations: [],
    Educations: [],
    HealthConditions: []
  };
  
  pers.firstName = item.GetChildValue('NAME', 'GIVN');
  pers.lastName = item.GetChildValue('NAME', 'SURN');

  if(item.childs['SEX'] != undefined)
    pers.gender = item.childs['SEX'].value == 'M' ? 1 : 0;
  for(var key in PersonEvents)
    if(item.childs[key] != undefined)
      pers.Events.push({
        date: item.GetChildValue(key, 'DATE'),
        address: item.GetChildValue(key, 'PLAC'),
        notes: item.GetChildValue(key, '_FNA'),
        type: PersonEvents[key] 
      });

  if(item.childs['OCCU'] != undefined)
    pers.Occupations.push({
      type: 'job',
      description: item.childs['OCCU'].value
    });
  
  return pers;
}

function GetFamily(item) {
  var fam = { 
    gedcomId: item.key,
    childs: [],
    Events: [],      
  };

  if(item.childs['HUSB'] != undefined)
    fam.husb = item.childs['HUSB'].value;
  if(item.childs['WIFE'] != undefined)
    fam.wife = item.childs['WIFE'].value;
  
  for(var key in item.childs)
    if(item.childs[key].key == 'CHIL')
      fam.childs.push(item.childs[key].value); 

  for(var key in RelationshipEvents)
    if(item.childs[key] != undefined)
      fam.Events.push({
        date: item.GetChildValue(key, 'DATE'),
        address: item.GetChildValue(key, 'PLAC'),
        type: RelationshipEvents[key] 
      });
  
  return fam;
}

function GetGedComTree(data) {
    var lines = data.split(/\r?\n/);
    var result = [];
    var lineIdx = { value: 0 };
    var line;
    var item;
    var lastItem = [];    

    while(lines[lineIdx.value] != undefined)
    {
        line = lines[lineIdx.value];
        lineIdx.value++;

        if(line == null || line == undefined || line == '')
            continue;        

        item = GetGedComItem(line);
        lastItem[item.level] = item;
        if(item.level == undefined)
            continue;
        if(item.level == 0)
            result.push(item);
        else if(item.level > 0 && lastItem[item.level - 1] != undefined)
            lastItem[item.level - 1].childs[item.key] = item;
    }

    return result;
}

function GetGedComItem(line) {
    var lineEl = line.split(' ');
    return {
        level: lineEl[0],
        key: lineEl[1],
        value: line.replace(lineEl[0] + ' ' + lineEl[1] + ' ', ''),
        childs: [],
        GetChildValue: function(){
            var item = this.childs[arguments[0]];
            if(item == undefined)
                return undefined;
            if(arguments.length <= 1)
                return item.value;
            var args = [];
            for(var i=1; i<arguments.length; i++) 
              args[i-1] = arguments[i];
            return item.GetChildValue(...args);
        }
    }
}