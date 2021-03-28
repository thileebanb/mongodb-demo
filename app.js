const { connect, model } = require("mongoose");
const config = require("config");
const debug = require("debug")("app:db");

async function connectDB() {
  try {
    await connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debug("Connected to MongoDB...");
  } catch (error) {
    debug("Could not connect to MongoDB...", error);
  }
}

connectDB();

const courseSchema = {
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
};
const Course = model("Course", courseSchema);

async function createRecord() {
  const course = new Course({
    name: "React",
    author: "Thileeban",
    tags: ["frontend"],
    date: Date.now(),
    isPublished: true,
    price: 10,
  });
  result = await course.save();
  console.log(result);
}

// createRecord();

async function getCourse() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { author: /.*hil.*/i }])
    .select("name author price");
}

// Query first method
async function updateCourse(id) {
  try {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = "Thileeban Balasundaram";
    course.save();
    return course;
  } catch (error) {
    console.log(error);
    debug("Error on update course by id", error);
  }
}

// Direct update method
async function updateCourseById(id) {
  try {
    return await Course.updateOne(
      { _id: id },
      {
        $set: {
          author: "Mosh hamedani",
          price: 100,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// Direct update and get updated record
async function updateById(id) {
  try {
    return await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          author: "Mosh & Thileeban",
          isPublished: true,
          price: 100,
        },
      },
      { new: true, useFindAndModify: true }
    );
  } catch (error) {
    console.log(error);
  }
}

async function removeCourse(id) {
  return await Course.deleteOne({ _id: id });
}

async function run() {
  // const course = await updateCourseById("6060b09de9d3116d162666d6");
  const course = await getCourse();
  console.log(course);
}

run();
