import React, { createContext, useState } from 'react';

// Crie o contexto
export const AuthContext = createContext();

// Crie um componente de provedor para o contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Mantenha o usuário logado no estado

  // O valor que será fornecido para os componentes que consomem este contexto
  const authContextValue = {
    user,
    login: (userData) => setUser(userData), // Função para definir o usuário
    logout: () => setUser(null), // Função para limpar o usuário
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
