import express from 'express';
import path from 'path';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';

var PORT = process.env.PORT || 3000;
var env  = process.env.NODE_ENV || 'development';


var config = require(path.join(__dirname, 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
import db from './models';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import open from 'open';
import socket from 'socket.io';
import {Server} from 'http';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';
import bid from './routes/bid';


import profile from './routes/profile';

let app = express();
let server = Server(app);
let compiler = webpack(webpackConfig);
let io = socket(server);



app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/bid', bid);
app.use('/api/profile', profile);


// app.use(webpackMiddleware(compiler, {
//   hot: true,
//   publicPath: webpackConfig.output.publicPath,
//   noInfo: true
// }));

// app.use(webpackHotMiddleware(compiler));



app.use('/bundle.js', (req, res) => {
  console.log("eyyyyyyyyyyy")
  res.sendFile(path.join(__dirname, '../bundle.js'));
});

app.use('/', (req, res) => {
  console.log("jesus")
  res.sendFile(path.join(__dirname, './index.html'));
});

io.on('connection', function(socket) {  
  console.log('user connected on: ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected on: ' + socket.id);
  });
  socket.on('chat message', function(message){
    io.emit('chat message', message);
  });
});


db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
  });
});