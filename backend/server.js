const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// استدعاء ملفات الطرق (Routes)
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes'); // <--- ده اللي كان ناقص أو مش شغال

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// تفعيل الطرق (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes); // <--- السطر ده اللي بيشغل رابط الوحدات

app.get('/', (req, res) => {
    res.send("<h1>Server is Running! 🚀</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});