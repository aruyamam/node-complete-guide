import _ from 'lodash';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { validateUser } from '../helpers/validation';

const create = async (req, res) => {
   const { error } = validateUser(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).send('User already registered.');
   }

   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   await user.save();

   return res.send(_.pick(user, ['_id', 'name', 'email']));
};

export default {
   create,
};
