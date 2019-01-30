import express from 'express';
import genreCtrl from '../controllers/genre.controller';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

router
   .route('/api/genres')
   .get(genreCtrl.list)
   .post(auth, genreCtrl.create);

router
   .route('/api/genres/:id')
   .get(genreCtrl.read)
   .put(genreCtrl.update)
   .delete(auth, admin, genreCtrl.remove);

export default router;
