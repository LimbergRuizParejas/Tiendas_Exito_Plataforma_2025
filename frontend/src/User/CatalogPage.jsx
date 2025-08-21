import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInventory } from '../pages/services/inventoryService';
import { getCategories } from '../pages/services/categoryService';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import HomeCarousel from '../components/HomeCarousel';
import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoryData, categoriesData] = await Promise.all([
          getInventory(),
          getCategories().catch(() => []),
        ]);
        setProducts(inventoryData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        alert('No se pudo cargar el catálogo.');
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.nombreProducto?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || parseInt(p.categoriaId, 10) === parseInt(selectedCategory, 10);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-page">
      {/* Buscador y filtros arriba */}
      <div className="filters top-filters">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar productos..."
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Carrusel centrado debajo del filtro */}
      <div className="carousel-wrapper">
        <HomeCarousel />
      </div>

      {/* Grid de productos */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="product-card">
              <Link to={`/user/product/${item.id}`}>
                <img src={item.imagen} alt={item.nombreProducto} />
                <h3>{item.nombreProducto}</h3>
              </Link>
              <p>Precio: {parseFloat(item.precio).toFixed(2)} Bs</p>
              <p>Stock: {item.cantidad}</p>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No hay productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
