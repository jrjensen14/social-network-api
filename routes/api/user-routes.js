const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

//  /api/users/:id
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  // Set up /api/users/:userId/friends/:friendsId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;

