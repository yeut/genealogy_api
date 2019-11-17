'use strict';

const fs = require('fs');
const db = require(__dirname + '/models/index.js');

const express = require('express'); // npm express
const app = express();
const http = require('http').Server(app);

//const cookieParser = require('cookie-parser'); // npm cookie-parser
const httpPort = 80;

const managers = [
  require(__dirname + '/managers/person.js'),
  require(__dirname + '/managers/relationship.js'),
  
  require(__dirname + '/managers/tree.js'),
  require(__dirname + '/managers/statistics.js'),
  
  require(__dirname + '/managers/gedcom.js'),
  require(__dirname + '/managers/aboville.js'),
  require(__dirname + '/managers/sosastradonitz.js'),
];

app.use(express.json());

http.listen(httpPort, function (req, res) {
  console.log('HTTP - Server listenning at ' + httpPort);
});

app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', ip);
  next();
});

managers.forEach(element => element.Register(db, app));

/*
As a best practice, almost of developers are recommending following way. 
If you want to identify a resource, you should use Path Variable. 
But if you want to sort or filter items, then you should use query parameter. 
So, for example you can define like this:
  /users # Fetch a list of users
  /users?occupation=programer # Fetch a list of programer user
  /users/123 # Fetch a user who has id 123
*/