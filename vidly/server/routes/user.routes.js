import express from 'express';
import userCtrl from '../controllers/user.controller';
import auth from '../middleware/auth';

const router = express.Router();

router.route('/api/users').post(userCtrl.create);

router.route('/api/users/me').get(auth, userCtrl.read);

export default router;
