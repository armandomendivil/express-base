var express = require('express');
var bodyParser = require('body-parser');
var user = require('./controller/user');
var item = require('./controller/item');

var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false,
  limit: '50mb' }));
app.use(bodyParser.json());

// Users
app.get('/users', user.list);
app.post('/user', user.post);
app.get('/user/:id', user.get);
app.put('/user/:id', user.put);
app.delete('/user/:id', user.delete);

// Items
app.get('/items', item.list);
app.post('/item', item.post);
app.get('/item/:id', item.get);
app.put('/item/:id', item.put);
app.delete('/item/:id', item.delete);

app.listen(9000, function  () {
  console.log('Esuchando puerto 9000');
});
