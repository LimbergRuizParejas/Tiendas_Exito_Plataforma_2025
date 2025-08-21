import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas principales
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Productos
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';

// Categorías
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';
import CategoryDetail from './pages/Categories/CategoryDetail';

// Marcas
import BrandList from './pages/Brands/BrandList';
import BrandForm from './pages/Brands/BrandForm';
import BrandDetail from './pages/Brands/BrandDetail';

// Logins
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';

// Ruta protegida para admin
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Login usuarios normales */}
        <Route path="/login" element={<UserLogin />} />

        {/* Login administradores */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rutas protegidas del área admin */}
        <Route path="/productos" element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        } />
        <Route path="/productos/nuevo" element={
          <PrivateRoute>
            <ProductForm />
          </PrivateRoute>
        } />
        <Route path="/productos/:id" element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } />

        <Route path="/categorias" element={
          <PrivateRoute>
            <CategoryList />
          </PrivateRoute>
        } />
        <Route path="/categorias/nueva" element={
          <PrivateRoute>
            <CategoryForm />
          </PrivateRoute>
        } />
        <Route path="/categorias/:id" element={
          <PrivateRoute>
            <CategoryDetail />
          </PrivateRoute>
        } />

        <Route path="/marcas" element={
          <PrivateRoute>
            <BrandList />
          </PrivateRoute>
        } />
        <Route path="/marcas/nueva" element={
          <PrivateRoute>
            <BrandForm />
          </PrivateRoute>
        } />
        <Route path="/marcas/:id" element={
          <PrivateRoute>
            <BrandDetail />
          </PrivateRoute>
        } />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
