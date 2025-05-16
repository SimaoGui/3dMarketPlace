import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllProducts from './pages/Products'
import HomePage from './pages/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/produtos" element={<AllProducts />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;