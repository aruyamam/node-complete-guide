import express from 'express';

import genreRoute from './routes/genre.routes';

const app = express();

app.use(express.json());

app.use('/', genreRoute);

export default app;
