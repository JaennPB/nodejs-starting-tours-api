const express = require('express');

// ================================================ imports
const toursController = require('./../controllers/toursController');

// ================================================ routes

// route middleware
const router = express.Router();

// param middleware (will happen before all CRUD requests because of where it's placed)
router.param('id', toursController.checkParamId);

router
  .route('/')
  .get(toursController.GetAllTours)
  .post(toursController.checkBody, toursController.postTour);
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.patchTour)
  .delete(toursController.deleteTour);

module.exports = router;
