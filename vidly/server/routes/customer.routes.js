import express from 'express';
import customerCtrl from '../controllers/customer.controller';

const router = express.Router();

router
   .route('/api/customers')
   .get(customerCtrl.list)
   .post(customerCtrl.create);

router
   .route('/api/customers/:id')
   .get(customerCtrl.read)
   .put(customerCtrl.update)
   .delete(customerCtrl.remove);

export default router;
