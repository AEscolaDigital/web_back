const { Segments, Joi, celebrate } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).max(255),
    })
  }),
}