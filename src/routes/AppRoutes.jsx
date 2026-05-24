import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Pages
import { HomePage }      from '../pages/Home/HomePage';
import { LoginPage }     from '../pages/Login/LoginPage';
import { RegisterPage }  from '../pages/Register/RegisterPage';
import { ProductsPage }  from '../pages/Products/ProductsPage';
import { CartPage }      from '../pages/Cart/CartPage';
import { CheckoutPage }  from '../pages/Checkout/CheckoutPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index          element={<HomePage />} />
        <Route path="login"   element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="carrito"   element={<CartPage />} />

        {/* Protected routes (requieren sesión) */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
