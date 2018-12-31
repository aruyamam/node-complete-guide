import Joi from 'joi';

const validateGenre = (genre) => {
   const schema = {
      name: Joi.string()
         .min(3)
         .required(),
   };

   return Joi.validate(genre, schema);
};

export default validateGenre;
