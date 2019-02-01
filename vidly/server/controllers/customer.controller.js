import Customer from '../models/customer.model';
import { validateCustomer } from '../helpers/validation';

const validate = (req, res) => {
   const { error } = validateCustomer(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }
};

const list = async (req, res) => {
   const customer = await Customer.find().sort('name');

   res.send(customer);
};

const create = async (req, res) => {
   validate(req, res);

   let customer = new Customer(req.body);
   customer = await customer.save();

   res.send(customer);
};

const read = async (req, res) => {
   const customer = await Customer.findById(req.params.id);

   if (!customer) {
      return res.status(404).send('The customer with the given ID was not found');
   }

   res.send(customer);
};

const update = async (req, res) => {
   validate(req, res);

   const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });

   if (!customer) {
      return res.status(404).send('The customer with the given ID was not found');
   }

   res.send(customer);
};

const remove = async (req, res) => {
   const customer = await Customer.findById(req.params.id);

   if (!customer) {
      return res.status(404).send('The customer with the given ID was not found');
   }

   res.send(customer);
};

export default {
   list,
   create,
   read,
   remove,
   update,
};
