const mongoose = require('mongoose');

mongoose
   .connect(
      'mongodb://localhost/playground',
      { useNewUrlParser: true },
   )
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /patter/
   },
   category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network'],
      lowercase: true,
      // uppercase: true,
      trim: true,
   },
   author: String,
   tags: {
      type: Array,
      validate: {
         isAsync: true,
         validator(v, callback) {
            setTimeout(() => {
               // Do some async work
               const result = v && v.length > 0;
               callback(result);
            }, 4000);
            // return v && v.length > 0;
         },
         message: 'A course should have at least one tag.',
      },
   },
   date: {
      type: Date,
      default: Date.now,
   },
   isPublished: Boolean,
   price: {
      type: Number,
      required() {
         return this.isPublished;
      },
      min: 10,
      max: 200,
      get: v => Math.round(v),
      set: v => Math.round(v),
   },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
   const course = new Course({
      name: 'Angular Course',
      category: 'Web',
      author: 'Mosh',
      tags: ['frontend'],
      isPublished: true,
      price: 15.8,
   });

   try {
      const result = await course.save();
      console.log(result);
   }
   catch (ex) {
      for (field in ex.errors) {
         console.log(ex.errors[field].message);
      }
   }
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
   // const courses = await Course.find({ author: 'Mosh', isPublished: true })
   // .find({ price: { $gte: 10, $lte: 20 } })
   // .find({ price: { $in: [10, 15, 20] } })
   // .find()
   // .or([{ author: 'Mosh' }, { isPublished: true }])
   // .and([])
   // .find({ author: /pattern/ })
   // pagenation
   // .skip((pageNumber - 1) * pageSize)
   // .limit(pageSize)
   // .limit(10)
   // .sort({ name: 1 }) // -1
   // .select({ name: 1, tags: 1 });
   // .count();
   const courses = await Course.find()
      .find({ _id: '5c34163a55cb553a281f2460' })
      .sort({ name: 1 })
      .select({ name: 1, tags: 1, price: 1 });

   console.log(courses[0].price);
}

getCourses();

async function updateCourse(id) {
   // query first
   // const course = await Course.findById(id);
   // if (!course) return;

   // course.isPublished = true;
   // course.author = 'Another Author';
   // course.set({
   //    isPublished: true,
   //    author: 'Another Author',
   // });
   // const result = await course.save();

   // update first
   // const result = await Course.update(
   //    { _id: id },
   //    {
   //       $set: {
   //          author: 'Mosh',
   //          isPublished: false,
   //       },
   //    },
   // );
   const course = await Course.findByIdAndUpdate(
      id,
      {
         $set: {
            author: 'Jason',
            isPublished: false,
         },
      },
      { new: true },
   );

   console.log(course);
}

// updateCourse('5c2eba68f8adf450947e7fa4');

async function removeCourse(id) {
   // const result = await Course.deleteOne({ _id: id });
   const course = await Course.findByIdAndRemove(id);
   console.log(course);
}

// removeCourse('5c2eba68f8adf450947e7fa4');
