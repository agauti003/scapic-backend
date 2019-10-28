/* eslint-disable no-console */
import bodyParser from 'body-parser';
import helmet from 'helmet';
import Routes from './routes';
import isAuth from './Middleware/isAuth';

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
// const logger = require('morgan');

const server = express();
server.use(helmet());

// view engine setup
// server.use(logger('dev'));
server.use(bodyParser.json({ limit: '2mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
server.use(cookieParser());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, x-access-token, Content-Type, Accept, Authorization');
  next();
});

server.use('/accounts', Routes.UsersRouter);
server.use(isAuth);
server.use('/models', Routes.ModelsRouter);


// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404));
});

// error handler
server.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
https.createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert'),
}, server)
  .listen(process.env.APP_PORT, () => {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Worm hole opened in dimension 5000, now go change the world! `_` ',
    );
  });

module.exports = server;
