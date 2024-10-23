import React, { useContext } from 'react';
import { ClientContext } from './clienteContext';

const Header = () => {
  const { client, logout } = useContext(ClientContext);

  return (
    <header>
      <h1>Minha Aplicação</h1>
      {client ? (
        <div>
          <span>Bem-vindo, {client.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Você não está logado.</span>
      )}
    </header>
  );
};

export default Header;
