import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';

// Páginas públicas
import CatalogPage from '../../User/CatalogPage';
import ProductDetailPage from '../../User/ProductDetailPage';
import CartPage from '../../User/CartPage';
import UserLogin from '../UserLogin';

// Páginas admin
import AdminLogin from '../AdminLogin';
import AdminDashboard from '../AdminDashboard';
import ProductList from '../Products/ProductList';
import ProductForm from '../Products/ProductForm';
import ProductDetail from '../Products/ProductDetail';
import CategoryList from '../Categories/CategoryList';
import CategoryForm from '../Categories/CategoryForm';
import CategoryDetail from '../Categories/CategoryDetail';
import BrandList from '../Brands/BrandList';
import BrandForm from '../Brands/BrandForm';
import BrandDetail from '../Brands/BrandDetail';

// Otros
import NotFound from '../NotFound';

// Protección para admin
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* VISTA PÚBLICA - CLIENTE */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path="user/catalog" element={<CatalogPage />} />
          <Route path="user/product/:id" element={<ProductDetailPage />} />
          <Route path="user/cart" element={<CartPage />} />
          <Route path="user/login" element={<UserLogin />} />
          {/* Página 404 para rutas no encontradas en cliente */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* LOGIN ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ÁREA ADMIN - protegida */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/:id/edit" element={<ProductForm />} />

          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CategoryForm />} />
          <Route path="categories/:id" element={<CategoryDetail />} />
          <Route path="categories/:id/edit" element={<CategoryForm />} />

          <Route path="brands" element={<BrandList />} />
          <Route path="brands/create" element={<BrandForm />} />
          <Route path="brands/:id" element={<BrandDetail />} />
          <Route path="brands/:id/edit" element={<BrandForm />} />

          {/* Página 404 específica admin */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
