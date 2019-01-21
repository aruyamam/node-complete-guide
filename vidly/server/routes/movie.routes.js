import express from 'express';
import movieCtrl from '../controllers/movie.controller';

const router = express.Router();

router
   .route('/api/movies')
   .get(movieCtrl.list)
   .post(movieCtrl.create);

router
   .route('/api/movies/:id')
   .get(movieCtrl.read)
   .put(movieCtrl.update)
   .delete(movieCtrl.remove);

export default router;
