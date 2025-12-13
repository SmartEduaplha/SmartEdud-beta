import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // استدعاء التنقل

const QuizView = () => {
  const navigate = useNavigate(); // تعريف التنقل

  const questions = [
    {
      id: 1,
      text: "We usually ______ to the club on Fridays.",
      options: ["go", "goes", "going", "went"],
      correct: 0
    },
    {
      id: 2,
      text: "She ______ like playing tennis.",
      options: ["don't", "doesn't", "isn't", "aren't"],
      correct: 1
    },
    {
      id: 3,
      text: "______ they watch TV in the evening?",
      options: ["Does", "Is", "Do", "Are"],
      correct: 2
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    setTimeout(() => {
      if (index === questions[currentQ].correct) {
        setScore(score + 1);
      }
      
      const nextQ = currentQ + 1;
      if (nextQ < questions.length) {
        setCurrentQ(nextQ);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  // شاشة النتيجة النهائية
  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800 p-8 rounded-3xl text-center max-w-sm w-full border border-slate-700 shadow-2xl"
        >
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-3xl font-bold text-white mb-2">Excellent!</h2>
          <p className="text-slate-400 mb-6">You completed the quiz</p>
          
          <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-700">
            <div className="text-sm text-slate-400">Your Score</div>
            <div className="text-4xl font-black text-green-400 mt-2">
              {score} <span className="text-lg text-slate-500">/ {questions.length}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/lesson')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
          >
            Back to Lesson
          </button>
        </motion.div>
      </div>
    );
  }

  // شاشة الأسئلة
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center pt-10 px-4">
      {/* 1. الشريط العلوي */}
      <div className="w-full max-w-xl mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/lesson')}
          className="text-slate-400 hover:text-white transition"
        >
          ✖ Quit
        </button>
        <div className="flex flex-col items-center w-full px-8">
          <div className="flex justify-between w-full text-xs text-slate-400 mb-2">
            <span>Question {currentQ + 1}/{questions.length}</span>
            <span className="text-orange-400">⏱ 04:59</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* 2. كارت السؤال */}
      <div className="w-full max-w-xl">
        <motion.div
          key={currentQ}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-center">
            {questions[currentQ].text}
          </h2>
        </motion.div>

        {/* 3. الاختيارات */}
        <div className="space-y-3">
          {questions[currentQ].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedOption !== null}
              className={`w-full p-4 rounded-xl text-left font-semibold text-lg border-2 transition-all transform hover:scale-[1.01] active:scale-95 flex justify-between items-center
                ${selectedOption === index 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700'} 
              `}
            >
              <span>{option}</span>
              {selectedOption === index && <span>⏳</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizView;