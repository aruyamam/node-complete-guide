const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const authenticate = require('./authenticate');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

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

const courses = [
   { id: 1, name: 'course1' },
   { id: 2, name: 'course2' },
   { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
   res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.get('/api/courses', (req, res) => {
   res.render(courses);
});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
   if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
   }

   return res.send(course);
});

app.post('/api/courses', (req, res) => {
   const { error } = vialidateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const course = {
      id: courses.length + 1,
      name: req.body.name,
   };
   courses.push(course);

   res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
   if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
   }

   const { error } = vialidateCourse(req.body);

   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   course.name = req.body.name;
   return res.send(course);
});

function vialidateCourse(course) {
   const schema = {
      name: Joi.string()
         .min(3)
         .required(),
   };

   return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
   if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
   }

   const index = courses.indexOf(course);
   courses.splice(index, 1);

   return res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
