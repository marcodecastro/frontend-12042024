import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Paper } from '@mui/material';
import './Inicial.css'; 
import { FaUser, FaUserFriends, FaChild, FaRegHeart } from 'react-icons/fa'; // Importando ícones

function Inicial() {
  return (
    <div className="home-page">
      <Typography variant="h2" gutterBottom>
        Bem-vindo à sua Página Inicial
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUser size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Nome do Membro
            </Typography>
            <Typography variant="body1">
              Preencha o formulário do Nome do Membro aqui.
            </Typography>
            <Link to="/membro">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUser size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Nome da Esposa
            </Typography>
            <Typography variant="body1">
              Preencha o formulário do Nome da Esposa aqui.
            </Typography>
            <Link to="/esposa">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUserFriends size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Filhos
            </Typography>
            <Typography variant="body1">
              Preencha o formulário com nome dos Filhos aqui.
            </Typography>
            <Link to="/filhos">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaChild size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Graus Simbólicos
            </Typography>
            <Typography variant="body1">
              Preencha o formulário dos Graus Simbólicos aqui.
            </Typography>
            <Link to="/simbolicos">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaRegHeart size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Instalação Maçônica
            </Typography>
            <Typography variant="body1">
              Preencha o formulário de Instalação Maçônica aqui.
            </Typography>
            <Link to="/instalacao">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUser size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Graus Filosóficos
            </Typography>
            <Typography variant="body1">
              Preencha o formulário dos Graus Filosóficos aqui.
            </Typography>
            <Link to="/filosoficos">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUserFriends size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Graus Adicionais
            </Typography>
            <Typography variant="body1">
              Preencha o formulário dos Graus Adicionais aqui.
            </Typography>
            <Link to="/adicionais">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUserFriends size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
              Data de Casamento
            </Typography>
            <Typography variant="body1">
              Preencha o formulário com data de casamento aqui.
            </Typography>
            <Link to="/casamento">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="card">
            <div className="icon">
              <FaUserFriends size={50} />
            </div>
            <Typography variant="h4" gutterBottom>
            Cav. de Santa Cruz
            </Typography>
            <Typography variant="body1">
              Preencha o formulário com data de casamento aqui.
            </Typography>
            <Link to="/apostolado">
              <Button variant="contained" color="primary">
                Preencher Formulário
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Inicial;

