// Copyright 2015-2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';
var data;
var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyBeDeMAuT1WpRZ3T8bB2dC2zTfSiumyeQg",
  authDomain: "knsakib.firebaseapp.com",
  databaseURL: "https://knsakib.firebaseio.com",
  storageBucket: "project-5135657072435335305.appspot.com",
};
firebase.initializeApp(config);
firebase.database.enableLogging(true);

var dbRef=firebase.database().ref('redlight');


dbRef.on('value', function(snap){
data=snap.val();
});



app.get('/api/dataread', function (req, res) {
  //res.status(200).send('Hello, world!');
  // res.send(data);


  res.status(200).send(data);


});

//
// app.get('*', function(req, res) {
//         res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

app.use(express.static(__dirname + '/public')); 	


// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
