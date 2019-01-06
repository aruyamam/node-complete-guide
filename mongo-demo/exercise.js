const mongoose = require('mongoose');

mongoose
   .connect(
      'mongodb://localhost/mongo-exercises',
      {
         useNewUrlParser: true,
      },
   )
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: [String],
   data: {
      type: Date,
      default: Date.now,
   },
   isPublished: Boolean,
   price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
   return (
      // Course.find({ isPublished: true, tags: 'backend' })
      //    .sort({ name: 1 })
      //    // .select({ name: 1, author: 1 });
      //    .select('name author')
      // Course.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
      // Course.find({ isPublished: true })
      //    .or([{ tags: 'frontend' }, { tages: 'backend' }])
      //    .sort('-price')
      //    .select('name author price')
      Course.find({ isPublished: true }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
   );
}

async function run() {
   const courses = await getCourses();
   console.log(courses);
}

run();
