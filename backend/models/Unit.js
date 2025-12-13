const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true }, // اسم الوحدة (مثلاً: Visitors to Egypt)
  description: { type: String }, // وصف بسيط
  stage: { type: String, required: true }, // المرحلة (prep1, prep2, sec1...)
  term: { type: Number, default: 1 }, // الترم الأول ولا التاني
  order: { type: Number, required: true }, // ترتيب الوحدة (1, 2, 3)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Unit', unitSchema);