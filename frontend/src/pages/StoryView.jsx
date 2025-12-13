import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StoryView = () => {
  // هنا بنحط القصص المتاحة في الترم
  // مثال: 1 إعدادي عندهم قصتين
  const stories = [
    {
      id: 1,
      title: "Story A: Old Man & Sea",
      cover: "🌊", // ممكن نحط صورة هنا
      color: "from-blue-600 to-cyan-500",
      chapters: [
        { id: 1, title: "The Big Fish", status: "completed" },
        { id: 2, title: "The Shark Attack", status: "active" },
        { id: 3, title: "Returning Home", status: "locked" },
      ]
    },
    {
      id: 2,
      title: "Story B: Iron Man",
      cover: "🤖",
      color: "from-red-600 to-orange-500",
      chapters: [
        { id: 1, title: "Who is Tony?", status: "locked" },
        { id: 2, title: "The Suit", status: "locked" },
        { id: 3, title: "Saving the World", status: "locked" },
      ]
    }
  ];

  // حالة لتحديد القصة المعروضة حالياً (لأولى وتانية إعدادي)
  const [activeStoryId, setActiveStoryId] = useState(stories[0].id);

  // نجيب بيانات القصة المختارة
  const currentStory = stories.find(s => s.id === activeStoryId);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      {/* زر العودة */}
      <button className="fixed top-4 left-4 z-50 bg-slate-800/80 backdrop-blur p-2 rounded-full border border-slate-600 hover:bg-slate-700">
        🔙
      </button>

      {/* 1. التبديل بين القصص (يظهر فقط لو فيه أكثر من قصة) */}
      {stories.length > 1 && (
        <div className="pt-20 px-4 pb-4">
          <div className="bg-slate-800 p-1 rounded-xl flex gap-1 max-w-md mx-auto border border-slate-700">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryId(story.id)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeStoryId === story.id 
                  ? 'bg-slate-700 text-white shadow-lg border border-slate-600' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                {story.title.split(":")[0]} {/* يعرض Story A فقط للاختصار */}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. غلاف القصة الكبير */}
      <div className="relative px-4 mt-4">
        <motion.div 
          key={currentStory.id} // عشان يعمل حركة لما نغير القصة
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full max-w-md mx-auto aspect-[4/5] rounded-3xl bg-gradient-to-br ${currentStory.color} shadow-2xl relative overflow-hidden flex flex-col justify-end p-6`}
        >
          {/* تأثيرات خلفية */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
          
          {/* أيقونة أو صورة الغلاف */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-9xl filter drop-shadow-2xl">
            {currentStory.cover}
          </div>

          <div className="relative z-10">
            <div className="bg-black/30 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-xs mb-2 border border-white/20">
              Interactive Story 📖
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-2">{currentStory.title}</h1>
            <p className="text-white/80 text-sm">
              {currentStory.chapters.length} Chapters • Adventure
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3. قائمة الفصول */}
      <div className="max-w-md mx-auto px-4 mt-8 space-y-4">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Chapters</h3>
        
        {currentStory.chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border flex items-center justify-between group cursor-pointer transition-all
              ${chapter.status === 'active' 
                ? 'bg-slate-800 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                : chapter.status === 'completed' 
                ? 'bg-slate-800/50 border-green-900' 
                : 'bg-slate-900 border-slate-800 opacity-60'}`}
          >
            <div className="flex items-center gap-4">
              {/* رقم الفصل */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                ${chapter.status === 'active' ? 'bg-blue-600 text-white' : 
                  chapter.status === 'completed' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-500'}`}>
                {chapter.status === 'completed' ? '✓' : index + 1}
              </div>
              
              <div>
                <h4 className={`font-bold ${chapter.status === 'locked' ? 'text-slate-500' : 'text-white'}`}>
                  {chapter.title}
                </h4>
                <span className="text-xs text-slate-500">
                  {chapter.status === 'active' ? 'Start Reading' : chapter.status === 'completed' ? 'Read Again' : 'Locked'}
                </span>
              </div>
            </div>

            {/* زر التشغيل */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border
               ${chapter.status === 'active' ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-slate-700 text-slate-700'}`}>
              ▶
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryView;