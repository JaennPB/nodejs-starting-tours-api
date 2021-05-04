const express = require('express');
const morgan = require('morgan');

// ================================================ creating app

const app = express();

// ================================================ imports

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

// ================================================ middlewares

//express middleware
app.use(express.json());

// own midlewares
app.use((req, res, next) => {
  console.log('hello from middleware 👋!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3rd party middlewares
app.use(morgan('dev'));

// route middlewares
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
