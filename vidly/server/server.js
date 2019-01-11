import mongoose from 'mongoose';
import app from './express';

mongoose
   .connect(
      'mongodb://localhost/vidly',
      { useNewUrlParser: true },
   )
   .then(() => console.log('Connected to MogoDB'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
   if (err) {
      console.log(err);
   }

   console.info(`Server Listening on port ${port}...`);
});
