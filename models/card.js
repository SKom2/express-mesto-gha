const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(value) {
        return /^https?:\/\/.*$/.test(value);
      }
    }
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default() {
      return Date.now();
    }
  }
});

module.exports = mongoose.model('card', cardSchema);
