import express from 'express';
import genreCtrl from '../controllers/genre.controller';

const router = express.Router();

router
   .route('/api/genres')
   .get(genreCtrl.list)
   .post(genreCtrl.create);

router
   .route('/api/genres/:id')
   .get(genreCtrl.genreById)
   .put(genreCtrl.update)
   .delete(genreCtrl.remove);

export default router;
