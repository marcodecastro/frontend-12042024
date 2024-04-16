import React, { useState, useContext } from 'react'; // Importe o useContext
import { Link, useNavigate } from 'react-router-dom';
import email from "../components/images/email.png";
import lock from "../components/images/lock.png";
import profile from "../components/images/icon.jpg";
import '../components/Appe.css';
import { AuthContext } from '../contexts/AuthContext.js';


const Login = () => {
  const [form, setForm] = useState({
    email: '',
    senha: '',
  });

  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {    
    e.preventDefault(); 
    try {
      // Enviar os dados ao backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });


      if (!response.ok) {
        throw new Error(responseData.message || 'Erro desconhecido');
      }

      const responseData = await response.json();

      // Redireciona para a página inicial
      login(responseData); 
      navigate('/inicial');
    } catch (error) {
      console.error('Erro no cliente:', error);
    }
  };

  return (
    <div className='main'>
      <div className='sub-main'>
        <div>
          <div className='imgs'>
            <div className='container-image'>
              <img src={profile} alt='profile' className='profile'/>
            </div>
          </div>
          <div>
            <h1 className='LHeader'>Login</h1>
            <div>
              <img src={email} alt="email" className='email' />
              <input type="email" placeholder='Digite seu Email' className='fill' name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className='second-input'>
              <img src={lock} alt='password' className='email' />
              <input type="password" placeholder='Digite sua Senha' className='fill' name="senha" value={form.senha} onChange={handleChange} required />
            </div>
            <div className='login-btn'>
              <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
            <div className='reg-link'>
              <p>Se ainda não tem uma conta</p>
              <Link className='link' to='/cadastrar'>
                <li>Registre-se</li>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
