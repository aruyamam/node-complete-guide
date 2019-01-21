import Customer from '../models/customer.model';
import { validateCustomer } from '../helpers/validation';

const tryAndCatchAsync = async (req, res, func) => {
   try {
      const customer = await func();

      if (!customer) {
         return res.status(404).send({ error: 'The customer with the given ID was not found.' });
      }

      return res.send(customer);
   }
   catch (ex) {
      console.error(ex.message);
      return res.send(ex.message);
   }
};

const validate = (req, res) => {
   const { error } = validateCustomer(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }
};

const list = (req, res) => {
   tryAndCatchAsync(req, res, () => Customer.find().sort('name'));
};

const create = (req, res) => {
   validate(req, res);
   const customer = new Customer(req.body);
   tryAndCatchAsync(req, res, () => customer.save());
};

const read = (req, res) => {
   tryAndCatchAsync(req, res, () => Customer.findOne({ _id: req.params.id }));
};

const update = (req, res) => {
   validate(req, res);
   tryAndCatchAsync(req, res, () => Customer.findOneAndUpdate(req.params.id, req.body));
};

const remove = (req, res) => {
   tryAndCatchAsync(req, res, () => Customer.findOneAndRemove(req.params.id));
};

export default {
   list,
   create,
   read,
   remove,
   update,
};
