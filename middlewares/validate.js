const { celebrate, Joi } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (!/^https?:\/\/.*$/.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (!/^https?:\/\/.*$/.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  })
});

const validId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
})

module.exports = {
  validateUserBody,
  validateCardBody,
  validId
};
