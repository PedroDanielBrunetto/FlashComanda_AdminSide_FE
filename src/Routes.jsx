import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/index.jsx';
import Cardapios from './pages/Admin/Service/Cardapios/index.jsx';
import CadastroCardapio from './pages/Admin/Service/Cardapios/Cadastro/index.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NotFoundPage />} />
    <Route path="cardapios" element={<Cardapios />} />
    <Route path="cardapios/cadastro" element={<CadastroCardapio />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
