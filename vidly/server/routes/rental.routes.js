import express from 'express';
import rentalCtrl from '../controllers/rental.controller';

const router = express.Router();

router
   .route('/api/rentals')
   .get(rentalCtrl.list)
   .post(rentalCtrl.create);

router.route('/api/rentals/:id').get(rentalCtrl.read);

export default router;
