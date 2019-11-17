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
    console.log('Import gedcom file ' + req.file.originalName);
    var data = Import(req.file.buffer.toString());
  
    data.forEach(element => db.models.Person.create(element));

    res.json(data);
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
    var persons = [];
    var personsDic = [];
    var families = [];
    var pers,
        fam;
    
    tree.forEach(function (el) {
        switch(el.value)
        {
            case 'INDI':
                pers = GetPerson(el);
                persons.push(pers);
                personsDic[pers.gedcomId] = pers;
                break;
            case 'FAM' :
                fam = GetFamily(el);
                families[fam.gedcomId] = fam;
                break;
            default:
                console.log('Unknown item Type [' + el.value + ']');
                break;
        }
    });
    return persons;
}

function GetPerson(item) {
    var pers = { gedcomId: item.key, Events: [] };
    var ev;
    
    pers.firstName = item.GetChildValue('NAME', 'GIVN');
    pers.lastName = item.GetChildValue('NAME', 'SURN');

    if(item.childs['SEX'] != undefined)
        pers.gender = item.childs['SEX'].value == 'M' ? 1 : 0;
    if(item.childs['BIRT'] != undefined) {
        ev = {};
        pers.Events.push(ev);
        ev.date = item.GetChildValue('BIRT', 'DATE');
        ev.address = item.GetChildValue('BIRT', 'PLAC');
        ev.notes = item.GetChildValue('BIRT', '_FNA');
    }
    
    return pers;
}

function GetFamily(item) {
    var fam = { gedcomId: item.key };
    /*
    pers.firstName = item.GetChildValue('NAME', 'GIVN');
    pers.lastName = item.GetChildValue('NAME', 'SURN');

    if(item.childs['SEX'] != undefined)
        pers.gender = item.childs['SEX'].value == 'M' ? 1 : 0;
    if(item.childs['BIRT'] != undefined) {
        ev = {};
        pers.Events.push(ev);
        ev.date = item.GetChildValue('BIRT', 'DATE');
        ev.address = item.GetChildValue('BIRT', 'PLAC');
        ev.notes = item.GetChildValue('BIRT', '_FNA');
    }*/
    
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
            for(var i=1; i<arguments.length; i++) args[i-1] = arguments[i];
            return item.GetChildValue(...args);
        }
    }
}