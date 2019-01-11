import validateGenre from '../helpers/validation';
import Genre from '../models/genre.model';

const list = async (req, res) => {
   try {
      const genres = await Genre.find().sort('name');

      return res.send(genres);
   }
   catch (ex) {
      console.log(ex.message);
   }
};

const create = async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   try {
      const genre = new Genre(req.body);
      const result = await genre.save();

      return res.send(result);
   }
   catch (ex) {
      for (field in ex.errors) {
         console.log(ex.errors[field].message);
      }
   }
};

const read = async (req, res) => {
   try {
      const genre = await Genre.findOne(req.params.id);

      if (!genre) {
         return res.status(404).send('The genre with the given ID was not found.');
      }

      return res.send(genre);
   }
   catch (ex) {
      console.log(ex.message);
      return res.send('The genre with the given ID was not found.');
   }
};

const update = async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   try {
      const genre = await Genre.findOneAndUpdate(req.params.id, req.body);

      if (!genre) {
         return res.status(404).send('The genre with the given ID was not found.');
      }

      return res.send(genre);
   }
   catch (ex) {
      console.log(ex);
   }
};

const remove = async (req, res) => {
   try {
      const genre = await Genre.findOneAndRemove(req.params.id);

      if (!genre) {
         return res.status(404).send('The genre with the given ID was not found.');
      }

      return res.send(genre);
   }
   catch (ex) {
      console.log(ex);
   }
};

export default {
   create,
   list,
   read,
   remove,
   update,
};
