import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../services/inventoryService';
import { getCategories } from '../services/categoryService';
import { getBrands } from '../services/brandService';
import './InventoryList.css';

const InventoryList = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [summary, setSummary] = useState({ totalProducts: 0, totalValue: 0 });
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    nombreProducto: '',
    cantidad: '',
    precio: '',
    categoriaId: '',
    marcaId: '',
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryData = await getInventory();
        const categoryData = await getCategories();
        const brandData = await getBrands();

        const totalProducts = inventoryData.reduce(
          (sum, item) => sum + (item.cantidad || 0),
          0
        );
        const totalValue = inventoryData.reduce(
          (sum, item) => sum + (item.cantidad || 0) * (item.precio || 0),
          0
        );

        setInventory(inventoryData);
        setSummary({ totalProducts, totalValue });
        setCategories(categoryData);
        setBrands(brandData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addInventoryItem(newItem);
      setNewItem({
        nombreProducto: '',
        cantidad: '',
        precio: '',
        categoriaId: '',
        marcaId: '',
      });
      const updatedInventory = await getInventory();
      const totalProducts = updatedInventory.reduce(
        (sum, item) => sum + (item.cantidad || 0),
        0
      );
      const totalValue = updatedInventory.reduce(
        (sum, item) => sum + (item.cantidad || 0) * (item.precio || 0),
        0
      );
      setInventory(updatedInventory);
      setSummary({ totalProducts, totalValue });
      alert('Producto agregado con éxito');
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Error al agregar el producto.');
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await updateInventoryItem(editingItem.id, editingItem);
      setEditingItem(null);
      const updatedInventory = await getInventory();
      const totalProducts = updatedInventory.reduce(
        (sum, item) => sum + (item.cantidad || 0),
        0
      );
      const totalValue = updatedInventory.reduce(
        (sum, item) => sum + (item.cantidad || 0) * (item.precio || 0),
        0
      );
      setInventory(updatedInventory);
      setSummary({ totalProducts, totalValue });
      alert('Producto actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('¿Deseas eliminar este producto?')) {
      try {
        await deleteInventoryItem(id);
        const updatedInventory = await getInventory();
        const totalProducts = updatedInventory.reduce(
          (sum, item) => sum + (item.cantidad || 0),
          0
        );
        const totalValue = updatedInventory.reduce(
          (sum, item) => sum + (item.cantidad || 0) * (item.precio || 0),
          0
        );
        setInventory(updatedInventory);
        setSummary({ totalProducts, totalValue });
        alert('Producto eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto.');
      }
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearchQuery = item.nombreProducto
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '' || String(item.categoriaId) === selectedCategory;

    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="inventory">
      <div className="header">
        <h1>Gestión de Inventario</h1>
        <button className="catalog-btn" onClick={() => navigate('/catalog')}>
          Ir al Inicio
        </button>
      </div>
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <>
          <div className="inventory-summary">
            <h2>Resumen del Inventario</h2>
            <p>Total de Productos: {summary.totalProducts}</p>
            <p>Valor Total: {summary.totalValue.toFixed(2)} Bs</p>
          </div>
          <div className="category-bar">
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Ocultar Formulario' : 'Agregar/Editar Producto'}
          </button>
          {showForm && (
            <form
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              className="inventory-form"
            >
              <h3>{editingItem ? 'Editar Producto' : 'Agregar Producto'}</h3>
              <input
                type="text"
                name="nombreProducto"
                placeholder="Nombre del Producto"
                value={editingItem ? editingItem.nombreProducto : newItem.nombreProducto}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={editingItem ? editingItem.cantidad : newItem.cantidad}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                step="0.01"
                value={editingItem ? editingItem.precio : newItem.precio}
                onChange={handleInputChange}
                required
              />
              <select
                name="categoriaId"
                value={editingItem ? editingItem.categoriaId : newItem.categoriaId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar Categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.nombre}
                  </option>
                ))}
              </select>
              <select
                name="marcaId"
                value={editingItem ? editingItem.marcaId : newItem.marcaId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar Marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={String(brand.id)}>
                    {brand.nombre}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-btn">
                {editingItem ? 'Actualizar Producto' : 'Agregar Producto'}
              </button>
            </form>
          )}          <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Items</th>
              <th>Stock</th>
              <th>Precio (Bs)</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombreProducto}</td>
                <td>{item.cantidad || 0}</td>
                <td>{item.precio?.toFixed(2)}</td>
                <td>{categories.find((cat) => cat.id === item.categoriaId)?.nombre || 'Sin Categoría'}</td>
                <td>{brands.find((brand) => brand.id === item.marcaId)?.nombre || 'Sin Marca'}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingItem(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);
};

export default InventoryList;
