import mongoose from 'mongoose';
import config from 'config';
import app from './express';

if (!config.get('jwtPrivateKey')) {
   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
   process.exit(1);
}

mongoose
   .set('useCreateIndex', true)
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
