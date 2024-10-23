import React from 'react';
import { ClientProvider } from './ClientContext';
import Header from './Header';
import LoginPage from './LoginPage';

function App() {
  return (
    <ClientProvider>
      <Header />
      <LoginPage />
      {/* Adicione outras rotas e páginas do sistema aqui */}
    </ClientProvider>
  );
}

export default App;
