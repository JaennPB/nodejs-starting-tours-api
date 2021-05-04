const fs = require('fs');

const fsRoute = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(fsRoute));

exports.checkParamId = (req, res, next, val) => {
  console.log('====== PARAM MIDDLEWARE (id) ======');
  console.log(`Tour id is: ${val}`);
  console.log(req.params);

  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  console.log('====== OWN MIDDLEWARE (check body before POST) ======');

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'please add a body to post!',
    });
  }

  next();
};

exports.GetAllTours = (req, res) => {
  // express automatically adds headers (Content-Type: application/json) when adding .json()

  res.status(200).json({
    status: 'success',
    reqTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(fsRoute, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.patchTour = (req, res) => {
  const id = Number(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'UPDATED TOUR HERE',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);

  const newTour = tours.filter((tour) => tour.id !== id);
  fs.writeFile(fsRoute, JSON.stringify(newTour), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};
