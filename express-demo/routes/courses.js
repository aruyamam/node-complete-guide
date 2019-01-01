const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [
   { id: 1, name: 'course1' },
   { id: 2, name: 'course2' },
   { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
   res.render(courses);
});

router.get('/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
   if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
   }

   return res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
   if (!course) {
      return res.status(404).send('The course with the given ID was not found.');
   }

   const index = courses.indexOf(course);
   courses.splice(index, 1);

   return res.send(course);
});

module.exports = router;
