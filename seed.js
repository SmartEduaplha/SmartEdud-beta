const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Unit = require('./models/Unit');
const Lesson = require('./models/Lesson');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected for seeding'))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
    // تنظيف القديم
    await Unit.deleteMany({});
    await Lesson.deleteMany({});

    // إنشاء وحدة جديدة
    const unit1 = new Unit({
      title: "Unit 1: Visitors to Egypt",
      description: "Learn about tourism and ancient history",
      stage: "prep1",
      term: 1,
      order: 1
    });
    const savedUnit = await unit1.save();

    // إنشاء درس
    const lesson1 = new Lesson({
      title: "The Present Simple",
      unit: savedUnit._id,
      type: "grammar",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "شرح زمن المضارع البسيط",
      order: 1
    });
    await lesson1.save();

    console.log('🎉 Database Seeded!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedData();