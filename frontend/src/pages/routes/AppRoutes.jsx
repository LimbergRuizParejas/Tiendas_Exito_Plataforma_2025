import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../../User/UserLayout';

// Páginas Admin
import ProductList from '../Products/ProductList';
import ProductForm from '../Products/ProductForm';
import ProductDetail from '../Products/ProductDetail';
import CategoryList from '../Categories/CategoryList';
import CategoryForm from '../Categories/CategoryForm';
import BrandList from '../Brands/BrandList';
import BrandForm from '../Brands/BrandForm';
import InventoryList from '../Inventory/InventoryList';

// Catálogo institucional público
import Catalog from '../Catalog';

// E-commerce público
import UserCatalogPage from '../../User/CatalogPage';
import ProductDetailPage from '../../User/ProductDetailPage';
import CartPage from '../../User/CartPage';

// Página 404
import NotFound from '../NotFound';

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
