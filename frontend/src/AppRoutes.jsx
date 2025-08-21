import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './pages/layouts/MainLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import UserLayout from './User/UserLayout';

// Páginas Admin
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';
import BrandList from './pages/Brands/BrandList';
import BrandForm from './pages/Brands/BrandForm';
import InventoryList from './pages/Inventory/InventoryList';

// Catálogo institucional público
import Catalog from './pages/Catalog';

// E-commerce público
import UserCatalogPage from './User/CatalogPage';
import ProductDetailPage from './User/ProductDetailPage';
import CartPage from './User/CartPage';

// Página 404
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redirección principal al eCommerce */}
        <Route path="/" element={<Navigate to="/user/catalog" replace />} />

        {/* Catálogo institucional público (ej: presentación empresa, servicios, etc) */}
        <Route element={<MainLayout />}>
          <Route path="/catalog" element={<Catalog />} />
        </Route>

        {/* E-commerce público con su layout de cliente */}
        <Route element={<UserLayout />}>
          <Route path="/user/catalog" element={<UserCatalogPage />} />
          <Route path="/user/product/:id" element={<ProductDetailPage />} />
          <Route path="/user/cart" element={<CartPage />} />
        </Route>

        {/* Área administrativa con su layout (backend CMS) */}
        <Route element={<AdminLayout />}>
          <Route path="/inventory" element={<InventoryList />} />

          {/* Productos */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />

          {/* Categorías */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CategoryForm />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} />

          {/* Marcas */}
          <Route path="/brands" element={<BrandList />} />
          <Route path="/brands/create" element={<BrandForm />} />
          <Route path="/brands/:id/edit" element={<BrandForm />} />
        </Route>

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
