import mongoose, { Schema } from 'mongoose';

const GenreSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
});

export default mongoose.model('Genre', GenreSchema);
