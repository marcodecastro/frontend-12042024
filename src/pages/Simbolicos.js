import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './estiloSimbolicos.css';

const ParentComponent = () => {
  const [memberId, setMemberId] = useState('');

  return (
    <div>
      {/* Renderizando o componente Simbolicos e passando memberId e setMemberId como props */}
      <Simbolicos memberId={memberId} setMemberId={setMemberId} />
    </div>
  );
};

const Simbolicos = ({ memberId, setMemberId }) => {
  const [symbolicDegrees, setSymbolicDegrees] = useState([{ degree: '', date: new Date(), descricao: '' }]);

  const handleDegreeChange = (index, field, value) => {
    const updatedDegrees = [...symbolicDegrees];
    updatedDegrees[index][field] = value;
    setSymbolicDegrees(updatedDegrees);
  };

  const handleAddDegree = () => {
    setSymbolicDegrees([...symbolicDegrees, { degree: '', date: new Date(), descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    if (symbolicDegrees.length > 1) {
      const updatedDegrees = symbolicDegrees.filter((_, i) => i !== index);
      setSymbolicDegrees(updatedDegrees);
    }
  };

  const handleSubmit = async () => {
    try {
      // Filtrar os graus válidos antes de enviar a requisição
      const validDegrees = symbolicDegrees.filter(degree => degree.degree && degree.degree.trim() !== '');
      console.log('Graus válidos:', validDegrees);
  
      // Verificar se há pelo menos um grau definido
      if (validDegrees.length === 0) {
        throw new Error('Por favor, selecione pelo menos um grau.');
      }
  
      // Formatar os dados para enviar ao servidor
      const formattedDegrees = validDegrees.map(degree => ({
        grau: degree.degree,
        data: format(degree.date, 'dd/MM/yyyy'),
        descricao: degree.descricao
      }));
  
      const memberIdNumber = parseInt(memberId);
  
      const response = await fetch('http://localhost:5000/api/graussimbolicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedDegrees.map(degree => ({ ...degree, memberId: memberIdNumber })))
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o servidor');
      }
  
      // Limpar o formulário após o envio bem-sucedido
      setSymbolicDegrees([{ degree: '', date: new Date(), descricao: '' }]);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      alert('Erro ao enviar dados para o servidor');
    }
  };

  return (
    <div>
      <Typography variant="h2">Graus Simbólicos</Typography>

      <div className="form-group">
        <TextField
          fullWidth
          label="ID do Membro"
          variant="outlined"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>

      {symbolicDegrees.map((degree, index) => (
        <div key={`symbolic-${index}`}>
          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel>Grau</InputLabel>
              <Select
                value={degree.degree}
                onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="Aprendiz Maçom">Aprendiz Maçom</MenuItem>
                <MenuItem value="Companheiro Maçom">Companheiro Maçom</MenuItem>
                <MenuItem value="Mestre Maçom">Mestre Maçom</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <DatePicker
              selected={degree.date}
              onChange={(date) => handleDegreeChange(index, 'date', date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              label="Descrição"
              variant="outlined"
              value={degree.descricao}
              onChange={(e) => handleDegreeChange(index, 'descricao', e.target.value)}
            />
          </div>
          {index !== 0 && (
            <Button onClick={() => handleRemoveDegree(index)}>Remover</Button>
          )}
        </div>
      ))}
      <div className="form-group">
      <Button onClick={handleAddDegree}>Adicionar Grau</Button>
      </div>
      <div className="form-group">
      <Button onClick={handleSubmit}>Enviar</Button>
      </div>
      
    </div>
  );  
};

export default ParentComponent;
