import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import passport from 'passport';
import session from 'express-session';

import './init/mysql';
import initializePassport from './init/passport';
import initializeGithub from './init/github';

import middleware from './middleware';
import api from './api';
import config from './config/config.json';

let app = express();
app.server = http.createServer(app);
const socket = socketio(app.server);

app.use(morgan('dev'));

app.use(session({ 
  secret: 'PinterestClone',
  resave: false, 
  saveUninitialized: true,
  cookie: {
  	secure: false
  }
}));

app.use(express.json());
app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());

initializePassport();

app.use(cors({
	origin: config.CLIENT_URL,
	credentials: true
}));

initializeGithub(passport, app, socket);

app.use('/api/v1', api);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Now listening on ${app.server.address().port}`);
});

export default app;