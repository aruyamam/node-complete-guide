const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
// const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');

const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

// Configuration
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Application Name: ${config.get('mail.host')}`);
// console.log(`Application Name: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
   app.use(morgan('tiny'));
   debug('Morgan enabled...');
}

// Db work...
// dbDebugger('Connected to the database...');

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
