import React, { createContext, useState, useEffect } from 'react';

// Criando o contexto do cliente
export const ClientContext = createContext();

// Provider do contexto para envolver o sistema
export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const savedClient = localStorage.getItem('client');
    if (savedClient) {
      setClient(JSON.parse(savedClient));
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setClient(data.user);
      localStorage.setItem('client', JSON.stringify(data.user));
      localStorage.setItem('token', data.token); // Salvar token no localStorage
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    setClient(null);
    localStorage.removeItem('client');
    localStorage.removeItem('token'); // Remover token ao logout
  };

  return (
    <ClientContext.Provider value={{ client, login, logout }}>
      {children}
    </ClientContext.Provider>
  );
};
