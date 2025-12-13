import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // 1. متغيرات لتخزين اللي الطالب بيكتبه
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState(''); // لتخزين رسائل الخطأ

  // دالة لتحديث البيانات عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. الدالة الرئيسية: الاتصال بالسيرفر
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(''); // مسح أي خطأ قديم

    // تحديد الرابط: هل هو تسجيل دخول ولا حساب جديد؟
    const endpoint = isLogin 
      ? 'https://smart-edud-beta.vercel.app//api/auth/login' 
      : 'https://smart-edud-beta.vercel.app//api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        
        // 1. حفظ بيانات الطالب في ذاكرة المتصفح
        localStorage.setItem('user', JSON.stringify(data.user)); // <--- أهم سطر (الحفظ)
        
        navigate('/home');
      } else {
        setError(data.message || "حدث خطأ ما");
      }
    } catch (err) {
      setError("فشل الاتصال بالسيرفر. تأكد أن السيرفر يعمل.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* الخلفية المتحركة */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">SmartEdu</h1>
          <p className="text-slate-400">منصة مستر علاء النجار</p>
        </div>

        {/* التبديل بين دخول وحساب جديد */}
        <div className="flex bg-slate-900/50 p-1 rounded-lg mb-6">
          <button onClick={() => { setIsLogin(true); setError(''); }} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${isLogin ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>دخول</button>
          <button onClick={() => { setIsLogin(false); setError(''); }} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${!isLogin ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>حساب جديد</button>
        </div>

        {/* رسالة الخطأ تظهر هنا */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <div>
              <label className="block text-slate-400 text-sm mb-1">اسم الطالب</label>
              <input 
                type="text" name="name" 
                value={formData.name} onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" 
                placeholder="الاسم ثلاثي" 
                required={!isLogin} // مطلوب فقط في الحساب الجديد
              />
            </div>
          )}
          
          <div>
            <label className="block text-slate-400 text-sm mb-1">رقم الهاتف</label>
            <input 
              type="tel" name="phone"
              value={formData.phone} onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" 
              placeholder="010xxxxxxx" required 
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-1">كلمة السر</label>
            <input 
              type="password" name="password"
              value={formData.password} onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" 
              placeholder="••••••••" required 
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4">
            {isLogin ? 'ابدأ التعلم الآن 🚀' : 'إنشاء حساب مجاني ✨'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;