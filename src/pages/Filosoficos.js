import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './estiloSimbolicos.css';


const ParentComponent = () => {
  const [memberId, setMemberId] = useState('');

  return (
    <div>
      {/* Renderizando o componente Filosoficos e passando memberId e setMemberId como props */}
      <Filosoficos memberId={memberId} setMemberId={setMemberId} />
    </div>
  );
};

const Filosoficos = ({ memberId, setMemberId }) => {
  const [philosophicalDegrees, setPhilosophicalDegrees] = useState([{ degree: '', date: new Date(), descricao: '' }]);

  const handleDegreeChange = (index, field, value) => {
    const updatedDegrees = [...philosophicalDegrees];
    updatedDegrees[index][field] = value;
    setPhilosophicalDegrees(updatedDegrees);
  };

  const handleAddDegree = () => {
    setPhilosophicalDegrees([...philosophicalDegrees, { degree: '', date: new Date(), descricao: '' }]);
  };

  const handleRemoveDegree = (index) => {
    if (philosophicalDegrees.length > 1) {
      const updatedDegrees = philosophicalDegrees.filter((_, i) => i !== index);
      setPhilosophicalDegrees(updatedDegrees);
    }
  };

  const handleSubmit = async () => {
    try {
      // Filtrar os graus válidos antes de enviar a requisição
      const validDegrees = philosophicalDegrees.filter(degree => degree.degree && degree.degree.trim() !== '');
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
  
      const response = await fetch('http://localhost:5005/api/grausfilosoficos', {
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
      setPhilosophicalDegrees([{ degree: '', date: new Date(), descricao: '' }]);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
      alert('Erro ao enviar dados para o servidor');
    }
  };

  return (
    <div>
      <Typography variant="h2">Graus Filosóficos</Typography>

      <div className="form-group">
        <TextField
          fullWidth
          label="ID do Membro"
          variant="outlined"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>

      {philosophicalDegrees.map((degree, index) => (
        <div key={`philosophical-${index}`}>
          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel>Grau</InputLabel>
              <Select
                value={degree.degree}
                onChange={(e) => handleDegreeChange(index, 'degree', e.target.value)}
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="Grau 4 - Mestre Secreto">Grau 4 Mestre Secreto</MenuItem>
                <MenuItem value="Grau 7 - Primeiro Eleito ou Eleito dos Nove">Grau 7 Primeiro Eleito ou Eleito dos Nove</MenuItem>
                <MenuItem value="Grau 12 - Mestre Escocês ou Grão-Mestre Arquiteto">Grau 12 Mestre Escocês ou Grão-Mestre Arquiteto</MenuItem>
                <MenuItem value="Grau 14 - Grande Eleito ou Perfeito e Sublime Maçom">Grau 14 Grande Eleito ou Perfeito e Sublime Maçom</MenuItem>
                <MenuItem value="Grau 15 - Cavaleiro do Oriente, da Espada ou da Águia">Grau 15 Cavaleiro do Oriente, da Espada ou da Águia</MenuItem>
                <MenuItem value="Grau 18 - Cavaleiro Rosa-Cruz ">Grau 18 Cavaleiro Rosa-Cruz</MenuItem>
                <MenuItem value="Grau 21 - Cavaleiro Noaquita ou Cavaleiro Prussiano">Grau 21 Cavaleiro Noaquita ou Cavaleiro Prussiano</MenuItem>
                <MenuItem value="Grau 22 - Cavaleiro do Real Machado ou Príncipe do Líbano"> Grau 22 Cavaleiro do Real Machado ou Príncipe do Líbano</MenuItem>
                <MenuItem value="Grau 29 - Cavaleiro de Santo André">Grau 29 Cavaleiro de Santo André</MenuItem>
                <MenuItem value="Grau 30 - Cavaleiro Kadosch">Grau 30 Cavaleiro Kadosch</MenuItem>
                <MenuItem value="Grau 31 - Sublime Iniciado e Grande Precepto">Grau 31 Sublime Iniciado e Grande Precepto</MenuItem>
                <MenuItem value="Grau 32 - Prelado Corregedor e Ouvidor Geral">Grau 32 Prelado Corregedor e Ouvidor Geral</MenuItem>
                <MenuItem value="Grau 33 - Patriarca Inspetor-Geral ">Grau 33 Patriarca Inspetor-Geral</MenuItem>
                
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
