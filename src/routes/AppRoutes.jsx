import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/Home/HomePage';
// Placeholder pages
const ProductsPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Productos</h1><p className="mt-4 text-gray-600">Página de productos en construcción...</p></div>;
const DashboardPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Dashboard</h1><p className="mt-4 text-gray-600">Panel de control en construcción...</p></div>;
const LoginPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Login</h1><p className="mt-4 text-gray-600">Página de inicio de sesión en construcción...</p></div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
