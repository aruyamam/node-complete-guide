import mongoose, { Schema } from 'mongoose';

export const genreSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
});

export default mongoose.model('Genre', genreSchema);
