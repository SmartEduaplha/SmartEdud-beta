const User = require('../models/User');

// دالة تسجيل حساب جديد
exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // 1. التأكد هل الطالب مسجل من قبل؟
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "هذا الرقم مسجل مسبقاً" });
    }

    // 2. إنشاء طالب جديد
    user = new User({ name, phone, password });
    await user.save();

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح", user });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// دالة تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1. البحث عن الطالب
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "رقم الهاتف غير صحيح" });
    }

    // 2. التأكد من الباسورد (بشكل بسيط حالياً)
    if (user.password !== password) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    res.json({ message: "تم الدخول بنجاح", user });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};