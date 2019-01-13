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

export { validateGenre, validateCustomer };
