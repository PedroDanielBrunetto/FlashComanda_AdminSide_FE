import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/index.jsx'; 
import Cardapios from './pages/Admin/Service/Cardapios/index.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NotFoundPage />} />
    <Route path="cardapios" element={<Cardapios />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
