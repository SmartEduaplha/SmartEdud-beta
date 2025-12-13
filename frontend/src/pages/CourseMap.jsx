import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CourseMap = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]); // هنا هنخزن الوحدات اللي جاية من السيرفر
  const [loading, setLoading] = useState(true); // عشان نعرض علامة تحميل

  // أول ما الصفحة تفتح، كلم السيرفر
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('https://smart-edud-beta.vercel.app//api/content/units');
        const data = await response.json();
        setUnits(data); // خزن البيانات اللي جت
        setLoading(false); // وقف التحميل
      } catch (error) {
        console.error("Failed to fetch units", error);
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">جاري تحميل الخريطة... 🚀</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans relative overflow-x-hidden pb-20">
      {/* زر العودة */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => navigate('/home')} 
          className="bg-slate-800 p-3 rounded-full border border-slate-600 hover:bg-slate-700 transition shadow-lg"
        >
          🔙
        </button>
      </div>

      {/* الهيدر */}
      <div className="text-center pt-10 pb-8 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent sticky top-0 z-40">
        <h1 className="text-3xl font-bold text-white mb-2">
          Adventure <span className="text-blue-500">Map</span>
        </h1>
        <p className="text-slate-400 text-sm">رحلتك التعليمية تبدأ هنا</p>
      </div>

      {/* مسار اللعبة */}
      <div className="max-w-md mx-auto relative px-4">
        <div className="absolute left-1/2 top-10 bottom-0 w-1 border-l-2 border-dashed border-slate-700 -translate-x-1/2 z-0"></div>

        <div className="space-y-16 relative z-10 mt-4">
          {units.length === 0 ? (
            <div className="text-center text-slate-500">لا توجد وحدات مضافة حالياً</div>
          ) : (
            units.map((unit, index) => (
              <motion.div
                key={unit._id} // السيرفر بيبعت الـ id بالشكل ده _id
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-center gap-6`}
              >
                <div 
                  className="relative group cursor-pointer"
                  // لما نضغط، هنروح لصفحة الوحدة وهناخد معانا رقم الوحدة عشان نعرف نعرض دروسها
                  onClick={() => navigate('/unit', { state: { unitId: unit._id, unitTitle: unit.title } })}
                >
                  <div className="w-28 h-28 rounded-2xl rotate-3 hover:rotate-0 transition-all duration-300 flex flex-col items-center justify-center shadow-2xl border-b-4 relative overflow-hidden bg-slate-700 border-slate-900 hover:bg-slate-600">
                    <span className="text-4xl font-black drop-shadow-md text-white">
                      {index + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1 text-white/50">Start</span>
                  </div>

                  <div className={`absolute top-4 ${index % 2 === 0 ? '-left-40 text-right' : '-right-40 text-left'} w-36`}>
                     <div className="bg-slate-800/90 backdrop-blur border border-slate-600 p-2 rounded-lg shadow-xl">
                       <h3 className="font-bold text-sm text-white leading-tight">
                         {unit.title}
                       </h3>
                       <p className="text-xs text-slate-400 mt-1">{unit.description}</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseMap;