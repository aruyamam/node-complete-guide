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

// const Course = mongoose.model(
//    'Course',
//    new mongoose.Schema({
//       name: String,
//       author: {
//          type: authorSchema,
//          required: true,
//       },
//    }),
// );

const Course = mongoose.model(
   'Course',
   new mongoose.Schema({
      name: String,
      authors: [authorSchema],
   }),
);

async function createCourse(name, authors) {
   const course = new Course({
      name,
      authors,
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

async function addAuthor(courseId, author) {
   const course = await Course.findOne({ _id: courseId });
   course.authors.push(author);
   course.save();
}

async function removeAuthor(courseId, authorId) {
   const course = await Course.findOne({ _id: courseId });
   const author = course.authors.id(authorId);
   author.remove();
   course.save();
}

// addAuthor('5c3bf031d6deb32e30e537f8', new Author({ name: 'Amy' }));
removeAuthor('5c3bf031d6deb32e30e537f8', '5c3bf127a8aa942364dc6641');

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'John' })]);

// updateAuthor('5c3ab386923d5a53ac071e84');

// listCourses();
