import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // 1. تعريف المتغيرات (State & Hooks)
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // للتبديل بين الدخول والتسجيل
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // دالة تحديث البيانات عند الكتابة في الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. الدالة الرئيسية: الاتصال بالسيرفر (التي طلبتها)
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    // 👇 رابط السيرفر (الباك إند)
    const SERVER_URL = "https://smart-edud-beta.vercel.app";

    // تحديد العنوان بناءً على هل هو دخول أم تسجيل
    const endpoint = isLogin
      ? `${SERVER_URL}/api/auth/login`
      : `${SERVER_URL}/api/auth/register`;

    try {
      console.log("Attempting to connect to:", endpoint); // فحص الرابط

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        // حفظ بيانات المستخدم
        localStorage.setItem('user', JSON.stringify(data.user));
        // التوجيه للصفحة الرئيسية
        navigate('/home');
      } else {
        // عرض رسالة الخطأ القادمة من السيرفر
        setError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError("فشل الاتصال بالسيرفر. تأكد أن السيرفر يعمل.");
    }
  };

  // 3. واجهة المستخدم (JSX)
  return (
    <div className="login-container" style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleAuth}>
        {/* حقل الاسم يظهر فقط عند التسجيل الجديد */}
        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              placeholder="الاسم بالكامل"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {isLogin ? 'دخول' : 'تسجيل'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
        <span 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ color: '#007bff', cursor: 'pointer', marginRight: '5px', textDecoration: 'underline' }}
        >
          {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
        </span>
      </p>
    </div>
  );
};

// ⚠️ السطر ده هو اللي كان ناقص وعامل المشكلة
export default Login;