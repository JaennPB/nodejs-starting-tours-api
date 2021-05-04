const express = require('express');
const morgan = require('morgan');

// ================================================ creating app

const app = express();

// ================================================ imports

const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes');

// ================================================ middlewares

// express middleware
app.use(express.json());

// express middleware (serving static files)
app.use(express.static(`${__dirname}/public`));

// own midlewares (loggers, NO DATA YET AVAILABLE)
app.use((req, res, next) => {
  console.log('====== OWN MIDDLEWARE (logger) ======');
  console.log('hello from middleware 👋!');
  next();
});

app.use((req, res, next) => {
  console.log('====== OWN MIDDLEWARE (log req time) ======');
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // 3rd party middlewares (response middleware)
  app.use(morgan('dev'));
}

// route middlewares
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
