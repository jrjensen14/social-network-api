const router = require('express').Router();
const {
  // getThoughts,
  // getSingleThought,
  createThought,
  // updateThought,
  deleteThought,
  // addReaction,
  // removeReaction,
} = require('../../controllers/thought-controller');

router.route('/:userId').post(createThought);

router.route('/:userId/:thoughtId').delete(deleteThought);

module.exports = router;


