import React, { useState } from 'react';
import axios from 'axios';

function CadastroCasamento() {
  const [membroCim, setMembroCim] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação dos campos do formulário
    const errors = [];
    if (!membroCim) errors.push('O Membro CIM é obrigatório.');
    if (!data) errors.push('A Data é obrigatória.');
    if (!descricao) errors.push('A Descrição é obrigatória.');

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Configuração dos dados a serem enviados
    const formData = {
      membroCim: membroCim,
      data: data,
      descricao: descricao
    };

    try {
      // Verifica se o registro já existe
      const existingRecord = await axios.get(`http://localhost:5005/api/casamento/${membroCim}`);

      // Se o registro existir, atualiza
      const response = existingRecord.data ? await axios.put(`http://localhost:5005/api/casamento/${membroCim}`, formData) :
        await axios.post('http://localhost:5005/api/casamento', formData);

      if (response.status === 200 || response.status === 201) {
        setSubmissionStatus('Sucesso! Casamento ' + (existingRecord.data ? 'atualizado' : 'cadastrado') + '.');
        // Limpa o formulário após o sucesso
        setMembroCim('');
        setData('');
        setDescricao('');
      } else {
        setSubmissionStatus('Erro ao enviar dados.');
      }
    } catch (error) {
      setSubmissionStatus('Erro ao enviar dados. Por favor, tente novamente.');
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div className="cadastro-casamento">
      <h2>Cadastro de Casamento Maçônico</h2>

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="membroCim">Membro CIM:</label>
          <input
            type="text"
            id="membroCim"
            value={membroCim}
            onChange={(event) => setMembroCim(event.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(event) => setData(event.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>

        {validationErrors.length > 0 && (
          <div className="erros-validacao">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="status-envio">{submissionStatus}</div>
      </form>
    </div>
  );
}

export default CadastroCasamento;