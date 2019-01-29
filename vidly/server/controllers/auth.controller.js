import bcrypt from 'bcrypt';
import { validateAuth } from '../helpers/validation';
import User from '../models/user.model';

const login = async (req, res) => {
   const { error } = validateAuth(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const user = await User.findOne({ email: req.body.email });
   if (!user) {
      return res.status(400).send('Invalid email or password');
   }

   const vlaidPassword = await bcrypt.compare(req.body.password, user.password);
   if (!vlaidPassword) {
      return res.status(400).send('Invalid email or password');
   }

   const token = user.generateAuthToken();
   res.send(token);
};

export default {
   login,
};
