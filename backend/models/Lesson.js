const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true }, // عنوان الدرس
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true }, // ربط الدرس بالوحدة بتاعته
  type: { type: String, enum: ['grammar', 'vocab', 'story', 'skills'], default: 'grammar' }, // نوع الدرس
  videoUrl: { type: String, required: true }, // رابط الفيديو (يوتيوب)
  pdfUrl: { type: String }, // رابط المذكرة
  description: { type: String }, // الشرح النصي اللي تحت الفيديو
  order: { type: Number, default: 1 }, // ترتيب الدرس جوه الوحدة
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);