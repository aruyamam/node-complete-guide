require('express-async-errors');

export default (err, req, res, next) => {
   // Log the exception
   res.status(500).send('Something failed.');
};
