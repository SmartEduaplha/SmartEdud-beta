// 2. الدالة الرئيسية: الاتصال بالسيرفر (تم التعديل والضبط)
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(''); 

    // 👇 رابط السيرفر (الباك إند)
    // ملاحظة: تأكدنا إنه مفيش شرطة (/) في الآخر عشان العنوان يتبني صح
    const SERVER_URL = "https://smart-edud-beta.vercel.app"; 

    // تحديد العنوان بناءً على هل هو دخول أم تسجيل
    const endpoint = isLogin 
      ? `${SERVER_URL}/api/auth/login` 
      : `${SERVER_URL}/api/auth/register`;

    try {
      console.log("Attempting to connect to:", endpoint); // سطر فحص عشان نشوف الرابط في الكونسول

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