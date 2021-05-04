const express = require('express');

// ================================================ imports
const usersController = require('./../controllers/usersController');

// ================================================ routes

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.patchUser)
  .delete(usersController.deleteUser);

module.exports = router;
