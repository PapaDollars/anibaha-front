// Créez un fichier test-routes.tsx
import HomePage from '@/pages/HomePage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const TestHome = () => <div>Home Page Works!</div>;
const TestProducts = () => <div>Products Page Works!</div>;

const TestRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<TestProducts />} />
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};

export default TestRoutes;