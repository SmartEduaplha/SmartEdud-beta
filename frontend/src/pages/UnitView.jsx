import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom'; // استدعاء أدوات التنقل

const UnitView = () => {
  const navigate = useNavigate();
  const location = useLocation(); // هذه الأداة تسمح لنا بقراءة البيانات المرسلة
  
  // هنا نستلم بيانات الوحدة (الرقم والاسم) التي أرسلناها من صفحة الخريطة
  // إذا لم نجد بيانات (مثلاً دخلت الصفحة مباشرة)، نضع قيماً افتراضية لتجنب الخطأ
  const { unitId, unitTitle } = location.state || { unitId: null, unitTitle: "Unit View" };

  const sections = [
    // لاحظ: title هنا يجب أن يكون كلمة واحدة صغيرة (lowercase) لمطابقة ما في قاعدة البيانات
    { id: 1, title: "vocab", display: "Vocabulary", icon: "📖", color: "bg-orange-500", desc: "New words & definitions" },
    { id: 2, title: "grammar", display: "Grammar", icon: "⚙️", color: "bg-blue-600", desc: "Rules & structures" },
    { id: 3, title: "skills", display: "Skills", icon: "🗣️", color: "bg-purple-600", desc: "Reading, Writing & Dialogue" },
    { id: 4, title: "games", display: "Education Games", icon: "🎮", color: "bg-green-500", desc: "Play & Learn" },
    { id: 5, title: "exams", display: "Model Exams", icon: "📝", color: "bg-red-500", desc: "Test yourself" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-10">
      {/* رأس الصفحة مع الخلفية */}
      <div className="relative h-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            {unitTitle} {/* عرض اسم الوحدة الحقيقي */}
          </motion.h1>
          <p className="text-blue-200 bg-blue-900/50 px-4 py-1 rounded-full text-sm border border-blue-500/30">
            Adventure Mode
          </p>
        </div>
        
        {/* زر العودة للخريطة */}
        <button 
          onClick={() => navigate('/map')}
          className="absolute top-4 left-4 bg-white/10 backdrop-blur p-2 rounded-full hover:bg-white/20 transition"
        >
          🔙
        </button>
      </div>

      {/* قسم نسبة التقدم */}
      <div className="max-w-md mx-auto px-6 -mt-6 relative z-20 mb-8">
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Unit Progress</div>
            <div className="font-bold text-xl text-green-400">0%</div>
          </div>
          <div className="w-2/3 bg-slate-700 h-3 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[0%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </div>

      {/* شبكة الأقسام (Grammar, Vocab...) */}
      <div className="max-w-md mx-auto px-4 grid gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            // هنا يحدث السحر: عند الضغط ننتقل للدرس ونأخذ معنا رقم الوحدة ونوع القسم
            onClick={() => navigate('/lesson', { 
              state: { 
                unitId: unitId, 
                type: section.title // نرسل النوع (مثلاً grammar)
              } 
            })}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-slate-500 hover:shadow-xl transition-all group"
          >
            <div className={`w-14 h-14 ${section.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
              {section.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg">{section.display}</h3>
              <p className="text-slate-400 text-xs">{section.desc}</p>
            </div>

            <div className="bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 transition-colors">
              ➜
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UnitView;