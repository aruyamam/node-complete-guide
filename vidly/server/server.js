import app from './express';

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
   if (err) {
      console.log(err);
   }

   console.info(`Server Listening on port ${port}...`);
});
