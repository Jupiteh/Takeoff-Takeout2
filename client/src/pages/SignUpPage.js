import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: none;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  border: none;
  border-radius: 5px;
  background-color: #f0ad4e;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        email,
        password,
        role
      });

      setMessage('Inscription réussie! Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <Container>
      <Title>Inscription</Title>
      <Input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="restaurateur">Restaurateur</option>
        <option value="livreur">Livreur</option>
        <option value="developpeur">Développeur tiers</option>
        <option value="commercial">Service commercial</option>
      </Select>
      <Button onClick={handleSignUp}>S'inscrire</Button>
      {message && <p>{message}</p>}
      <Link to="/login" style={{ color: '#f0ad4e', marginTop: '10px' }}>Déjà un compte ? Connectez-vous</Link>
    </Container>
  );
};

export default SignUpPage;
