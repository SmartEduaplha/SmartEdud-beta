// 2. الدالة الرئيسية: الاتصال بالسيرفر (تم التعديل)
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(''); 

    // 👇 هنا التعديل المهم: حطينا رابط السيرفر الكامل
    const SERVER_URL = "https://smartedu-app.vercel.app"; 

    const endpoint = isLogin 
      ? `${SERVER_URL}/api/auth/login` 
      : `${SERVER_URL}/api/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.message || "حدث خطأ ما");
      }
    } catch (err) {
      console.error(err); // عشان نشوف الخطأ بالتفصيل لو حصل
      setError("فشل الاتصال بالسيرفر. تأكد أن السيرفر يعمل.");
    }
  };