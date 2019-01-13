const mongoose = require('mongoose');

mongoose
   .connect(
      'mongodb://localhost/playground',
      { useNewUrlParser: true },
   )
   .then(() => console.log('Connected to MongodB...'))
   .catch(err => console.error('Could not connect to MongoDB...'));

const authorSchema = new mongoose.Schema({
   name: String,
   bio: String,
   website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
   'Course',
   new mongoose.Schema({
      name: String,
      author: {
         type: authorSchema,
         required: true,
      },
   }),
);

async function createCourse(name, author) {
   const course = new Course({
      name,
      author,
   });

   const result = await course.save();
   console.log(result);
}

async function listCourses() {
   const courses = await Course.find();
   console.log(courses);
}

async function updateAuthor(courseId) {
   // const course = await Course.findOne({ _id: courseId });
   // course.author.name = 'Mosh Hamedani';
   // course.save();

   const course = await Course.updateOne(
      { _id: courseId },
      {
         // $set: {
         //    'author.name': 'John Smith',
         // },
         $unset: {
            author: '',
         },
      },
   );
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

updateAuthor('5c3ab386923d5a53ac071e84');

// listCourses();
