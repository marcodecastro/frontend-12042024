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
      {/* Renderizando o componente Adicionais e passando memberId e setMemberId como props */}
      <Adicionais memberId={memberId} setMemberId={setMemberId} />
    </div>
  );
};

const Adicionais = ({ memberId, setMemberId }) => {
  const [additionalDegrees, setAdditionalDegrees] = useState([{ degree: '', date: new Date(), descricao: '' }]);

  const handleDegreeChange = (index, field, value) => {
    const updatedDegrees = [...additionalDegrees];
    updatedDegrees[index][field] = value;
    setAdditionalDegrees(updatedDegrees);
  };

  const handleAddDegree = () => {
    setAdditionalDegrees([...additionalDegrees, { degree: '', date: new Date(), descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    if (additionalDegrees.length > 1) {
      const updatedDegrees = additionalDegrees.filter((_, i) => i !== index);
      setAdditionalDegrees(updatedDegrees);
    }
  };

  const handleSubmit = async () => {
    try {
      // Filtrar os graus válidos antes de enviar a requisição
      const validDegrees = additionalDegrees.filter(degree => degree.degree && degree.degree.trim() !== '');
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
  
      const response = await fetch('http://localhost:5005/api/grausadicionais', {
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
      setAdditionalDegrees([{ degree: '', date: new Date(), descricao: '' }]);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      alert('Erro ao enviar dados para o servidor');
    }
  };

  return (
    <div>
      <Typography variant="h2">Graus Adicionais</Typography>

      <div className="form-group">
        <TextField
          fullWidth
          label="ID do Membro"
          variant="outlined"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>

      {additionalDegrees.map((degree, index) => (
        <div key={`additional-${index}`}>
          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel>Grau</InputLabel>
              <Select
                value={degree.degree}
                onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="Mestre Maçom da Marca">Mestre Maçom da Marca</MenuItem>
                <MenuItem value="Nautas da Arca Real">Nautas da Arca Real</MenuItem>
                <MenuItem value="Arco Real">Arco Real</MenuItem>
                <MenuItem value="Cavaleiro Templário">Cavaleiro Templário</MenuItem>
                <MenuItem value="Cavaleiro de Malta">Cavaleiro de Malta</MenuItem>
                <MenuItem value="Cavaleiro de São João">Cavaleiro de São João</MenuItem>
                <MenuItem value="Cavaleiro de São Paulo">Cavaleiro de São Paulo</MenuItem>
                <MenuItem value="Cavaleiro de São Pedro">Cavaleiro de São Pedro</MenuItem>
                <MenuItem value="Cavaleiro de São Tiago">Cavaleiro de São Tiago</MenuItem>
                <MenuItem value="Cavaleiro de São João Evangelista">Cavaleiro de São João Evangelista</MenuItem>
                <MenuItem value="Cavaleiro de São André">Cavaleiro de São André</MenuItem>
                <MenuItem value="Cavaleiro de São Tomé">Cavaleiro de São Tomé</MenuItem>
                <MenuItem value="Cavaleiro de São Felipe">Cavaleiro de São Felipe</MenuItem>
                <MenuItem value="Cavaleiro de São Mateus">Cavaleiro de São Mateus</MenuItem>
                <MenuItem value="Cavaleiro de São Bartolomeu">Cavaleiro de São Bartolomeu</MenuItem>
                <MenuItem value="Cavaleiro de São Simão">Cavaleiro de São Simão</MenuItem>
                <MenuItem value="Cavaleiro de São Judas Tadeu">Cavaleiro de São Judas Tadeu</MenuItem>
                <MenuItem value="Cavaleiro de São Matias">Cavaleiro de São Matias</MenuItem>
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