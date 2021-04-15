const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts() {

  },

  // get single thought
  getSingleThought() {
    
  },

  // create a thought
  createThought({ params, body}, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        {_id: params.userId },
        { $push: { thoughts: _id }},
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'thought created but no user with that id' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // update a thought
  updateThought() {

  },

  // delete thought
  deleteThought({params}, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deleteThought => {
      if (!deleteThought) {
        return res.status(404).json({ message: 'no thought with this id' });
      }
      return User.findOneAndUpdate(
        { thoughts: params.thoughtId },
        { $pull: { thoughts: params.thoughtId }},
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'no thought found with this id/ thouhgt created' });
      }
      res.json({ message: 'thought deleted'});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
}

module.exports = thoughtController;