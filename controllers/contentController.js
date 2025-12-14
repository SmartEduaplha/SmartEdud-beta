const Unit = require('../models/Unit');
const Lesson = require('../models/Lesson'); // استدعاء نموذج الدرس

// ... دالة getUnits القديمة موجودة فوق ...

// دالة جديدة: هات الدروس بناءً على الوحدة والنوع
exports.getLessons = async (req, res) => {
  try {
    const { unitId } = req.params; // رقم الوحدة
    const { type } = req.query; // نوع الدرس (grammar, vocab...)

    // ابحث عن الدروس اللي تابعة للوحدة دي، وممكن نفلتر بالنوع لو مبعوت
    let query = { unit: unitId };
    if (type) query.type = type;

    const lessons = await Lesson.find(query).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الدروس" });
  }
};
// دالة لجلب كل الوحدات (مرتبة حسب الترتيب اللي حددناه)
exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ order: 1 }); // هات كله ورتبه
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الوحدات" });
  }
};