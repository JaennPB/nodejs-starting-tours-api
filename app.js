const express = require('express');
const morgan = require('morgan');

const app = express();
// ================================================ imports

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

// ================================================ middlewares

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware 👋!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan('dev'));

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
