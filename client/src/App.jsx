import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/common/Home';
import AdminProfile from './components/admin/AdminProfile';
import ArticlesByCategory from './components/articles/ArticlesByCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/articles/:category" element={<ArticlesByCategory />} />
      </Routes>
    </Router>
  );
}

export default App
