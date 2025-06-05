import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllProducts from './pages/Products';
import HomePage from './pages/Home';
import ProductDetail from './pages/ProductDetails'; // Importe o novo componente

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/produtos" element={<AllProducts />} />
        {/* Nova rota dinâmica para detalhes do produto */}
        <Route path="/produto">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;