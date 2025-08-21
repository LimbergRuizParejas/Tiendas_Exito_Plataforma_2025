import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './store/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Cargando productos...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
