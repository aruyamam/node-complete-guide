import Movie from '../models/movie.model';
import Genre from '../models/genre.model';
import { validateMovie } from '../helpers/validation';

const tryAndCatchAsync = async (func) => {
   try {
      const result = await func();

      return result;
   }
   catch (ex) {
      return { error: ex.message };
   }
};

const validate = (req, res) => {
   const { error } = validateMovie(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }
};

const findGenre = async (genreIds) => {
   const genres = [];

   if (Array.isArray(genreIds)) {
      await Promise.all(
         genreIds.map(async (genreId) => {
            const result = await tryAndCatchAsync(() => Genre.findById(genreId));

            const genre = {
               _id: result._id,
               name: result.name,
            };
            genres.push(genre);
         }),
      ).catch(err => console.log(err));
   }
   else {
      const result = await tryAndCatchAsync(() => Genre.findById(genreIds));
      genres.push(result);
   }

   return genres;
};

const list = async (req, res) => {
   const movies = await tryAndCatchAsync(() => Movie.find().sort('title'));

   return res.send(movies);
};

const create = async (req, res) => {
   validate(req, res);

   const {
      genreId, title, numberInStock, dailyRentalRate,
   } = req.body;

   const genres = await findGenre(genreId);

   const movie = new Movie({
      title,
      genres,
      numberInStock,
      dailyRentalRate,
   });

   await tryAndCatchAsync(() => movie.save());

   res.send(movie);
};

const read = async (req, res) => {
   const movie = await tryAndCatchAsync(() => Movie.findById(req.params.id));

   if (movie.error) {
      return res.status(404).send('The movie with the given Id was not found.');
   }

   return res.send(movie);
};

const update = async (req, res) => {
   validate(req, res);

   const {
      genreId, title, numberInStock, dailyRentalRate,
   } = req.body;

   const genres = await findGenre(genreId);

   if (genres.error) {
      return res.status(404).send('The movie with the given Id was not found.');
   }

   const movie = await tryAndCatchAsync(() =>
      Movie.findOneAndUpdate(
         { _id: req.params.id },
         {
            title,
            genres,
            numberInStock,
            dailyRentalRate,
         },
         { new: true },
      ));

   if (!movie || movie.error) {
      return res.status(404).send('The movie with the given ID was not found.');
   }

   return res.send(movie);
};

const remove = async (req, res) => {
   const movie = await tryAndCatchAsync(() => Movie.findByIdAndRemove(req.params.id));

   if (!movie) {
      return res.status(404).send('The movie with the given ID was no found.');
   }

   return res.send(movie);
};

export default {
   create,
   list,
   read,
   remove,
   update,
};
