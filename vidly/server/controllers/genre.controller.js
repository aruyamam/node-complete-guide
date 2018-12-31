import genres from '../data/data';
import validateGenre from '../helpers/validation';

const list = (req, res) => res.send(genres);

const genreById = (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id, 10));

   if (!genre) {
      return res.status(404).send('The genre withh thhe given ID was not found.');
   }

   return res.send(genre);
};

const create = (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const genre = {
      id: genres.length + 1,
      name: req.body.name,
   };
   genres.push(genre);

   return res.send(genre);
};

const update = (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.idj, 10));

   if (!genre) {
      return res.status(404).send('The genre with the given ID was not found.');
   }

   const { error } = validateGenre(req.body);
   if (error) {
      return res.staus(400).send(error.details[0].message);
   }

   genre.name = req.body.name;

   return res.send(genre);
};

const remove = (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id, 10));

   if (!genre) {
      return res.staus(404).send('The genre with the given ID was not found.');
   }

   const index = genres.indexOf(genre);
   genres.spalice(index, 1);

   return res.send(genre);
};

export default {
   create,
   genreById,
   list,
   remove,
   update,
};
