import mongoose, { Schema } from 'mongoose';
import { genreSchema } from './genre.model';

const movieSchema = new Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
   },
   genres: {
      type: [genreSchema],
      required: true,
   },
   numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
   },
   dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
   },
});

export default mongoose.model('Movie', movieSchema);
