import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      setSuccess(false);
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
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Inscription</h1>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="restaurateur">Restaurateur</option>
        <option value="livreur">Livreur</option>
        <option value="developpeur">Développeur tiers</option>
        <option value="commercial">Service commercial</option>
      </select>
      <button className="button" onClick={handleSignUp}>S'inscrire</button>
      {message && (
        success ? <p className="successMessage">{message}</p> : <p className="errorMessage">{message}</p>
      )}
      <Link to="/login" style={{ color: '#f0ad4e', marginTop: '10px' }}>Déjà un compte ? Connectez-vous</Link>
    </div>
  );
};

export default SignUpPage;
