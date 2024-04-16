import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import Home from './pages/Home.js';
import Cadastrar from './pages/Cadastrar.js';
import Login from './pages/Login.js';
import Membro from './pages/Membro.js';
import Esposa from './pages/Esposa.js';
import Filhos from './pages/Filhos.js';
import Inicial from './pages/Inicial.js';
import Simbolicos from './pages/Simbolicos.js';
import Filosoficos from './pages/Filosoficos.js';
import Adicionais from './pages/Adicionais.js';


const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membro" element={<Membro />} />
        <Route path="/esposa" element={<Esposa />} />
        <Route path="/filhos" element={<Filhos />} />
        <Route path="/inicial" element={<Inicial />} />
        <Route path="/simbolicos" element={<Simbolicos />} />
        <Route path="/filosoficos" element={<Filosoficos />} /> 
        <Route path="/adicionais" element={<Adicionais />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  
 

);

export default App;
