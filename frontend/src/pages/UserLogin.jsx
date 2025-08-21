import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('userToken', 'USER_FAKE_TOKEN');
      alert('Login correcto');
      navigate('/user/catalog', { replace: true });
    } else {
      alert('Ingresa correo y contraseña');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#c3002f' }}>
        Login Usuario
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#c3002f',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Iniciar Sesión
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        ¿No tienes cuenta? <a href="/register" style={{ color: '#c3002f', textDecoration: 'none' }}>Regístrate aquí</a>
      </p>
    </div>
  );
};

export default UserLogin;
