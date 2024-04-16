import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mail from "../components/images/email.png";
import lock from "../components/images/lock.png";
import profile from "../components/images/icon.jpg";
import '../components/Appe.css';


function Cadastrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(null);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Verifique se as senhas correspondem
    if (senha !== confirmarSenha) {
      setError('As senhas não correspondem!');
      setIsLoading(false);
      return;
    }

    try {
      // Enviar os dados ao backend
      const response = await fetch('http://localhost:5000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro desconhecido');
      }

      // Limpa qualquer erro anterior em caso de sucesso
      setError(null);

      // Atualiza o estado apenas se a resposta for bem-sucedida
      setCadastroSucesso(true);

      // Redireciona para a página home
      navigate('/telo'); 

      // Limpa os campos do formulário
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      setError(`Erro no cliente: ${error.message}`);
      console.error('Erro no cliente:', error);

      if (error.response) {
        // O servidor respondeu com um status de erro. Exiba a mensagem do servidor.
        setError(`Erro no servidor: ${error.response.message}`);
      } else {
        // Erro desconhecido
        setError(`Erro desconhecido: ${error.message}`);
      }
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <div className='sub-main'>
          <div>
            <h1>Cadastre-se</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cadastroSucesso && <p style={{ color: 'green' }}>Usuário cadastrado com sucesso.</p>}
            <div>
              <img src={profile} alt="emial" className='email' />
              <input type="text" placeholder='Nome Completo' className='fill' value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div className='mail-id'>
              <img src={mail} alt="emial" className='email' />
              <input type="email" placeholder='Digite seu email' className='fill' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mail-id'>
              <img src={lock} alt="emial" className='email' />
              <input type="password" placeholder='Digite a Senha' className='fill' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </div>
            <div className='mail-id'>
              <img src={lock} alt="emial" className='email' />
              <input type="password" placeholder='Confirme a Senha' className='fill' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}/>
            </div>
           
            <div className='login-btn'>
              <button type="submit">{isLoading ? 'Cadastrando...' : 'Cadastrar'}</button> 
            </div>
            <div className='reg-link'>
              <p>Se já tem uma conta</p><Link className='link' to='/Login'><li>Faça Login !!!</li></Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Cadastrar;