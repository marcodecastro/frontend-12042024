import React, { useState } from 'react';
import { Typography, TextField, Grid, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Membro = () => {
  const [memberName, setMemberName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [memberId, setMemberId] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [celular, setCelular] = useState(''); // Adicionei o estado para o celular
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5005/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formType: 'memberForm', 
          formData: { 
            memberName, 
            birthDate, 
            memberId, 
            memberEmail, 
            celular,
            cim: memberId, 
          },
        }),
      });
  
      if (response.ok && response.headers.get('Content-Type').includes('json')) {
        const data = await response.json();
        console.log('Dados enviados com sucesso:', data);
        // Limpar os campos do formulário
        setMemberName('');
        setBirthDate(null);
        setMemberId('');
        setMemberEmail('');
        setCelular(''); 
      
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
      <Typography variant="h2" gutterBottom>
        Dados Pessoais
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Membro"
              variant="outlined"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
              className="date-picker"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID do Membro"
              variant="outlined"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email do Membro"
              variant="outlined"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)} // Certifique-se de que memberEmail está sendo atualizado corretamente
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Celular"
              variant="outlined"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Membro;
