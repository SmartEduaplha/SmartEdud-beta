const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// استدعاء ملفات الراوت (تأكد أن المسار صحيح لملف الـ auth لديك)
// الكود الصحيح بدلاً من require('./routes/auth')
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- إعدادات الحماية والروابط (CORS) ---
// هذا هو الجزء الأهم لربط الموقع الجديد بالسيرفر
app.use(cors({
    origin: [
        "http://localhost:5173",          // رابط التجربة على جهازك (Vite)
        "http://localhost:3000",          // رابط تجربة احتياطي
        "https://https://smartedu-app.vercel.app" // ✅ الرابط الجديد لموقعك على Vercel
    ],
    credentials: true // للسماح بتبادل الكوكيز أو التوكن إذا كنت تستخدمهم
}));

// قراءة البيانات بصيغة JSON
app.use(express.json());

// --- الاتصال بقاعدة البيانات ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- الروابط (Routes) ---
// رابط الترحيب للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('SmartEdu Server is Running...');
});

// روابط المصادقة (تسجيل الدخول وإنشاء الحساب)
// هذا سيجعل الروابط تبدأ بـ /api/auth كما في كود الفرونت إند
app.use('/api/auth', authRoutes);

// --- تشغيل السيرفر ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});