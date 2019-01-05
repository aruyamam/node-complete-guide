const mongoose = require('mongoose');

mongoose
   .connect(
      'mongodb://localhost/playground',
      { useNewUrlParser: true },
   )
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: {
      type: Date,
      default: Date.now,
   },
   isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
   const course = new Course({
      name: 'Angular Course',
      author: 'Mosh',
      tags: ['angular', 'frontend'],
      isPublished: true,
   });

   const result = await course.save();
   console.log(result);
}

// createCourse();

async function getCourses() {
   const pageNumber = 2;
   const pageSize = 10;
   // Comparison Operators
   // eq (equal)
   // ne (not equal)
   // gt (greater than)
   // gte (greater then or equal to)
   // lt (less than)
   // ltc (less than or equal to)
   // in
   // nin (not in)

   // Logical Operators
   // or
   // and
   const courses = await Course.find({ author: 'Mosh', isPublished: true })
      // .find({ price: { $gte: 10, $lte: 20 } })
      // .find({ price: { $in: [10, 15, 20] } })
      // .find()
      // .or([{ author: 'Mosh' }, { isPublished: true }])
      // .and([])
      // .find({ author: /pattern/ })
      // pagenation
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      // .limit(10)
      .sort({ name: 1 }) // -1
      .select({ name: 1, tags: 1 });
   // .count();
   console.log(courses);
}

getCourses();
