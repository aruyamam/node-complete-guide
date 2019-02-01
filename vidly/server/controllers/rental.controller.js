import mongoose from 'mongoose';
import Fawn from 'fawn';
import Rental from '../models/rental.model';
import Customer from '../models/customer.model';
import Movie from '../models/movie.model';
import { validateRental } from '../helpers/validation';

Fawn.init(mongoose);

const validate = (req, res) => {
   const { error } = validateRental(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }
};

const list = async (req, res) => {
   const rentals = await Rental.find().sort('-dateOut');

   return res.send(rentals);
};

const create = async (req, res) => {
   validate(req, res);

   const customer = await Customer.findById(req.body.customerId);

   if (!customer || customer.error) {
      return res.status(400).send('Invalid customer.');
   }

   const movie = await Movie.findById(req.body.movieId);
   if (!movie) {
      return res.status(400).send('Invalid movie.');
   }

   if (movie.numberInStock === 0) {
      return res.status(400).send('Movie not in stock.');
   }

   const rental = new Rental({
      customer: {
         _id: customer._id,
         name: customer.name,
         phone: customer.phone,
      },
      movie: {
         _id: movie._id,
         title: movie.title,
         dailyRentalRate: movie.dailyRentalRate,
      },
   });

   new Fawn.Task()
      .save('rentals', rental)
      .update(
         'movies',
         { _id: movie._id },
         {
            $inc: { numberInStock: -1 },
         },
      )
      .run();

   res.send(rental);
};

const read = async (req, res) => {
   const rental = await Rental.findById(req.params.id);

   if (!rental) {
      return res.status(404).send('The rental with the given Id was not found.');
   }

   return res.send(rental);
};

export default {
   create,
   list,
   read,
};
