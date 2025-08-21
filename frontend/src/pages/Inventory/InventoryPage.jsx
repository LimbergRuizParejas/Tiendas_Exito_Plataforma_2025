import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import { getInventory } from '../services/inventoryService';
import { getCategories } from '../services/categoryService';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch inventory and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryData = await getInventory();
        const categoryData = await getCategories();
        setInventory(inventoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  // Filtered inventory based on search and category
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.nombreProducto
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.categoriaId === parseInt(selectedCategory, 10)
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-page">
      <h1>Gestión de Inventario</h1>
      <div className="filters">
        {/* Barra de búsqueda */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar productos..."
        />
        {/* Filtro por categoría */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className="inventory-list">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.nombreProducto}</td>
                <td>{item.categoria?.nombre || 'Sin Categoría'}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio?.toFixed(2)} Bs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
