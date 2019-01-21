import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
   },
   isGold: {
      type: Boolean,
      default: false,
   },
   phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
});

export default mongoose.model('Customer', customerSchema);
