import Joi from 'joi';

const validateGenre = (genre) => {
   const schema = {
      name: Joi.string()
         .min(3)
         .required(),
   };

   return Joi.validate(genre, schema);
};

const validateCustomer = (customer) => {
   const schema = {
      name: Joi.string()
         .min(5)
         .max(50)
         .required(),
      phone: Joi.string()
         .min(5)
         .max(50)
         .required(),
      isGold: Joi.boolean(),
   };

   return Joi.validate(customer, schema);
};

const validateMovie = (movie) => {
   const schema = {
      title: Joi.string()
         .min(5)
         .max(50)
         .required(),
      genreId: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
      numberInStock: Joi.number()
         .min(0)
         .required(),
      dailyRentalRate: Joi.number()
         .min(0)
         .required(),
   };

   return Joi.validate(movie, schema);
};

const validateRental = (rental) => {
   const schema = {
      customerId: Joi.string().required(),
      movieId: Joi.string().required(),
   };

   return Joi.validate(rental, schema);
};

export {
   validateGenre, validateCustomer, validateMovie, validateRental,
};
