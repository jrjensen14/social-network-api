const { User, Thought } = require('../models');

const userContoller = {
  // GET all users
  getUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single user by id
  getSingleUser({params}, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .populate('friends')
      .populate('thought')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'no user with that id' });
        }
        res.json(dbUserData);
      })
  },
  // create new user
  createUser({body}, res) {
    User.create(body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update user
  updateUser({params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id }, body, {new: true})
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'no user with that id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'no user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = userContoller; 