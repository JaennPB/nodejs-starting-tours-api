// ================================================================
// ============================================== requiring modules

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
// ============================================================================================
// ============================================== reading files synchronously on top level code

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// =========================================================
// ============================================== middleware
// MIDDLEWARE: function that gets the req and res from a post http method
// ORDER MATTERS!!
app.use(express.json());

// OWN middleware
// logger
app.use((req, res, next) => {
  console.log('hello from middleware 👋!');
  next();
});

// requested at middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3rd party middleware (logger)
app.use(morgan('dev'));

// =========================================================================
// ============================================== callbacks (route handlers)

const GetAllTours = (req, res) => {
  // express automatically adds headers (Content-Type: application/json) when adding .json()
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    reqTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const postTour = (req, res) => {
  // adding middleware to view POST request
  // MIDDLEWARE: function that gets the req and res from a post http method
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const patchTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'UPDATED TOUR HERE',
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  const newTours = tours.filter((tour) => tour.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const patchUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

// =====================================================
// ============================================== routes

// app.get('/api/v1/tours', GetAllTours);
// app.post('/api/v1/tours', postTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// simplified way

// resource "tours"
app.route('/api/v1/tours').get(GetAllTours).post(postTour);
app.route('/api/v1/tours/:id').get(getTour).patch(patchTour).delete(deleteTour);

// resource "users"
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(patchUser).delete(deleteUser);

// =============================================================
// ============================================== starting sever

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
