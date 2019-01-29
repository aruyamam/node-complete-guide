import mongoose, { Schema } from 'mongoose';
import config from 'config';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
   email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
   },
});

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));

   return token;
};

const User = mongoose.model('User', userSchema);

export default User;
