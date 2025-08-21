import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard Administrativo</h1>
      <button onClick={() => navigate('/catalog')}>Ir al Catálogo</button>
      {/* Otras opciones administrativas */}
    </div>
  );
};

export default Dashboard;
