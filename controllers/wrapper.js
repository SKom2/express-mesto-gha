const {
  NOT_FOUND,
  SUCCESS,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require('../constants/ErrorStatuses');
const mongoose = require('mongoose');
const wrapper = (handler, successStatus = SUCCESS) => {
  return (req, res) => {
    handler(req, res)
      .then((result) => {
        if (!result) {
          res.status(NOT_FOUND).send({ message: 'Card Id not found' });
          return;
        }
        res.status(successStatus).send(result);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.CastError) {
          res.status(BAD_REQUEST).send({ message: 'Invalid User Id' });
          return;
        }
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(BAD_REQUEST).send({
            message: 'Incorrect data sent'
          });
          return;
        }
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          stack: err.stack
        });
      })
  }
}

module.exports = wrapper;
