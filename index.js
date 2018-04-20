var express = require('express');
var bodyParser = require('body-parser');
var user = require('./controller/user');
var auth = require('./controller/auth');

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

// app.post('/regiser', auth.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

app.listen(9000, function  () {
  console.log('Esuchando puerto 9000');
});
