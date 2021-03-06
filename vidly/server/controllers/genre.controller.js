import { validateGenre } from '../helpers/validation';
import Genre from '../models/genre.model';

const list = async (req, res) => {
   const genres = await Genre.find().sort('name');

   return res.send(genres);
};

const create = async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const genre = new Genre(req.body);
   const result = await genre.save();

   return res.send(result);
};

const read = async (req, res) => {
   const genre = await Genre.findOne(req.params.id);

   if (!genre) {
      return res.status(404).send('The genre with the given ID was not found.');
   }

   return res.send(genre);
};

const update = async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const genre = await Genre.findOneAndUpdate(req.params.id, req.body);

   if (!genre) {
      return res.status(404).send('The genre with the given ID was not found.');
   }

   return res.send(genre);
};

const remove = async (req, res) => {
   const genre = await Genre.findOneAndRemove(req.params.id);

   if (!genre) {
      return res.status(404).send('The genre with the given ID was not found.');
   }

   return res.send(genre);
};

export default {
   create,
   list,
   read,
   remove,
   update,
};
