import express from 'express';

import genreRoutes from './routes/genre.routes';
import customerRoutes from './routes/customer.routes';
import movieRoutes from './routes/movie.routes';
import rentalRoutes from './routes/rental.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', genreRoutes);
app.use('/', customerRoutes);
app.use('/', movieRoutes);
app.use('/', rentalRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);

export default app;
