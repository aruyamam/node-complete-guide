import express from 'express';

import genreRoute from './routes/genre.routes';
import customerRoute from './routes/customer.routes';
import movieRoute from './routes/movie.routes';
import rentalRoute from './routes/rental.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', genreRoute);
app.use('/', customerRoute);
app.use('/', movieRoute);
app.use('/', rentalRoute);

export default app;
