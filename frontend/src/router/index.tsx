import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { CategoriesPage } from '../pages/CategoriesPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { OrdersPage } from '../pages/OrdersPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { RegisterPage } from '../pages/RegisterPage';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
    <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
    <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
  </Routes>
);
