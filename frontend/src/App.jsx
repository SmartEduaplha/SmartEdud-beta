import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// استدعاء كل الصفحات اللي عملناها
import Login from './pages/Login';
import StudentHome from './pages/StudentHome';
import CourseMap from './pages/CourseMap';
import UnitView from './pages/UnitView';
import StoryView from './pages/StoryView';
import LessonView from './pages/LessonView';
import QuizView from './pages/QuizView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* الصفحة الأولى (البوابة) */}
        <Route path="/" element={<Login />} />
        
        {/* باقي الصفحات (المسارات) */}
        <Route path="/home" element={<StudentHome />} />
        <Route path="/map" element={<CourseMap />} />
        <Route path="/unit" element={<UnitView />} />
        <Route path="/story" element={<StoryView />} />
        <Route path="/lesson" element={<LessonView />} />
        <Route path="/quiz" element={<QuizView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;