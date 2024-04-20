import React, { useState } from 'react';
import { Button, Typography, Grid, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Esposa = () => {
  const [spouseName, setSpouseName] = useState('');
  const [spouseBirthDate, setSpouseBirthDate] = useState(new Date());
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!spouseName || !memberId) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5006/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          formType: 'spouseForm', 
          formData: { 
            spouseName, 
            spouseBirthDate, 
            memberId 
          }
        })
      });

      if (response.ok && response.headers.get('Content-Type').includes('json')) {
        const data = await response.json();
        console.log('Dados enviados com sucesso:', data);
        // Limpar o formulário após o envio bem-sucedido
        setSpouseName('');
        setSpouseBirthDate(new Date());
        setMemberId('');
      } else {
        setError('Erro inesperado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setError('Erro ao enviar dados. Tente novamente mais tarde.');
    }
  };  

  return (
    <div>
      <Typography variant="h2">Nome da Esposa</Typography>
      <div>
        <TextField
          fullWidth
          label="Nome da Esposa"
          variant="outlined"
          value={spouseName}
          onChange={(e) => setSpouseName(e.target.value)}
          placeholder="Digite o nome da esposa"
        />
      </div>
      <div>
        <Typography variant="h4">Data de Nascimento:</Typography>
        <DatePicker
          selected={spouseBirthDate}
          onChange={(date) => setSpouseBirthDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione uma data"
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="ID do Membro"
          variant="outlined"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Digite o ID do membro"
        />
      </div>

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Enviar
      </Button>
    </div>
  );
};

export default Esposa;