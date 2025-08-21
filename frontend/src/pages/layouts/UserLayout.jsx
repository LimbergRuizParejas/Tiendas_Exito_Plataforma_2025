import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './UserLayout.css';

const UserLayout = () => {
  return (
    <>
      <header className="user-navbar">
        <Link to="/user/catalog" className="logo">Tienda Éxito</Link>
        <nav>
          <Link to="/user/catalog">Catálogo</Link>
          <Link to="/user/cart">Carrito</Link>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
