import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const LessonView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitId, type } = location.state || {}; // استلام البيانات

  const [lessons, setLessons] = useState([]); // قائمة الدروس
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // الدرس المعروض حالياً
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  // جلب الدروس من السيرفر
  useEffect(() => {
    if (!unitId) return; // لو مفيش وحدة ارجع

    const fetchLessons = async () => {
      try {
        // نطلب من السيرفر دروس الوحدة دي وبالنوع ده (مثلاً grammar)
        const res = await fetch(`http://localhost:5000/api/content/lessons/${unitId}?type=${type}`);
        const data = await res.json();
        setLessons(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed", err);
        setLoading(false);
      }
    };
    fetchLessons();
  }, [unitId, type]);

  if (loading) return <div className="text-white text-center pt-20">Loading Lesson... 🎬</div>;
  if (lessons.length === 0) return <div className="text-white text-center pt-20">No lessons found here yet 🤷‍♂️</div>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* 1. مشغل الفيديو */}
      <div className="w-full bg-slate-900 aspect-video relative shadow-2xl border-b border-slate-800">
        <button onClick={() => navigate('/unit', { state: { unitId } })} className="absolute top-4 left-4 z-20 bg-black/50 p-2 rounded-full">🔙</button>
        
        {/* iframe لعرض فيديو اليوتيوب الحقيقي */}
        <iframe 
          className="w-full h-full"
          src={currentLesson.videoUrl} 
          title="Lesson Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* 2. التفاصيل */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
        <p className="text-slate-400 text-sm mb-4">{currentLesson.description}</p>

        {/* التبديل بين الدروس لو فيه أكتر من فيديو */}
        {lessons.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            {lessons.map((l, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentLessonIndex(idx)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${currentLessonIndex === idx ? 'bg-blue-600' : 'bg-slate-800'}`}
              >
                Lesson {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* التابات (زي ما هي) */}
        <div className="border-b border-slate-800 flex gap-6 mb-6">
           <button onClick={() => setActiveTab('summary')} className="pb-3 text-blue-400 border-b-2 border-blue-400">📝 Notes</button>
           {/* ... باقي التابات ... */}
        </div>
        
        {/* المحتوى */}
         <div className="text-slate-300 leading-relaxed">
            {activeTab === 'summary' && <p>{currentLesson.description}</p>}
         </div>
      </div>
    </div>
  );
};

export default LessonView;