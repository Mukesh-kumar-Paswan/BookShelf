const Joi = require("joi");

const bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    author: Joi.string(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    stars: Joi.number().max(5).min(1).required(),
    comments : Joi.string().min(3).required(),
  }).required(),
})

const userSchema = Joi.object({
  username : Joi.string().min(3).max(12).required(),
  email :  Joi.string().email().required(),
  password : Joi.string().required(),
});

module.exports = {bookSchema , reviewSchema , userSchema };