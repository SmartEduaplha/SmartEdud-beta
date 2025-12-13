import React, { useEffect, useState } from 'react'; // 1. ضيف useEffect و useState
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const navigate = useNavigate();

  // 2. تجهيز مكان لتخزين بيانات الطالب الحقيقي
  const [student, setStudent] = useState({
    name: "Loading...", // اسم مؤقت لحد ما نحمل البيانات
    level: 1,
    xp: 0,
    maxXp: 100,
    coins: 0,
    streak: 0
  });

  // 3. أول ما الصفحة تفتح، هات البيانات من الذاكرة
  useEffect(() => {
    const savedUser = localStorage.getItem('user'); // هات البيانات المحفوظة
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setStudent({
        ...student, // حافظ على باقي البيانات الافتراضية
        name: parsedUser.name, // حط الاسم الحقيقي
        // ممكن نظبط باقي البيانات لاحقاً لما نربطها بالسيرفر بالكامل
      });
    } else {
      // لو مفيش بيانات (دخل خلسة)، رجعه يسجل دخول
      navigate('/');
    }
  }, []);

  const stages = [
    // ... (باقي الكود زي ما هو بالظبط) ...
    { id: 1, title: "Primary Stage", sub: "الصف 4 - 6", color: "from-yellow-400 to-orange-500", icon: "🎈" },
    { id: 2, title: "Prep Stage", sub: "الصف 1 - 3", color: "from-blue-400 to-cyan-500", icon: "🚀" }, // دي اللي هتشتغل
    { id: 3, title: "Secondary Stage", sub: "الصف 1 - 3", color: "from-purple-400 to-pink-500", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      {/* ... (الجزء العلوي زي ما هو) ... */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-20 shadow-xl">
         {/* ... (نفس كود الهيدر السابق) ... */}
         <div className="flex justify-between items-center max-w-4xl mx-auto">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-lg">{student.name.charAt(0)}</div>
               <div><h2 className="font-bold text-lg">{student.name}</h2><div className="text-xs text-slate-400">Level {student.level} Scholar</div></div>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold"><span>🪙</span> <span>{student.coins}</span></div>
                  <div className="flex items-center gap-1 text-orange-400 text-xs font-bold"><span>🔥</span> <span>{student.streak} Days</span></div>
                </div>
             </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-slate-200">Choose Your Stage 📚</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              // هنا التعديل: لما يضغط على أي مرحلة يروح للخريطة (كمثال)
              onClick={() => navigate('/map')}
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stage.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`}></div>
              <div className="relative bg-slate-800 border border-slate-700 p-6 rounded-2xl h-48 flex flex-col items-center justify-center gap-4 hover:border-slate-500 transition-all">
                <span className="text-5xl drop-shadow-lg filter">{stage.icon}</span>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{stage.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* زر القصة يوديك لصفحة القصص */}
      <motion.button
        onClick={() => navigate('/story')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 rounded-full shadow-2xl border-2 border-indigo-400 z-50 flex items-center gap-2"
      >
        <span className="text-2xl">🏰</span>
        <span className="font-bold hidden md:inline">Story Mode</span>
      </motion.button>
    </div>
  );
};
export default StudentHome;