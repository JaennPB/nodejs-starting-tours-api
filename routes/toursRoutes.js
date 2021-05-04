const express = require('express');

// ================================================ imports
const toursController = require('./../controllers/toursController');

// ================================================ routes

const router = express.Router();

router
  .route('/')
  .get(toursController.GetAllTours)
  .post(toursController.postTour);
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.patchTour)
  .delete(toursController.deleteTour);

module.exports = router;
