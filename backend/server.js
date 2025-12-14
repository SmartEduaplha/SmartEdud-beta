const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// استدعاء ملفات الراوت
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. إصلاح مشكلة الاتصال (السماح للجميع مؤقتاً)
app.use(cors());

// 2. قراءة البيانات
app.use(express.json());

// 3. الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. تعريف الروابط (ركز هنا)
app.get('/', (req, res) => {
    res.send('SmartEdu Server is Running...');
});

// هذا السطر معناه: أي رابط يبدأ بـ /api/auth روح دور عليه في ملف authRoutes
app.use('/api/auth', authRoutes);

// 5. تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 6. سطر فيرسل السحري (مهم جداً)
module.exports = app;