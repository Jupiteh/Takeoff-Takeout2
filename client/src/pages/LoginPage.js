import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../features/user/userSlice';
import jwt from 'jsonwebtoken';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username: email, password });
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      dispatch(setUser({ name: decodedToken.name, email: decodedToken.email, token }));
      toast.success('Connexion réussie !');
      setError('');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Login failed', error);
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="title">Connexion</h1>
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
      {error && <p className="errorMessage">{error}</p>}
      <button className="button" onClick={handleLogin} disabled={user.status === 'loading'}>
        Se connecter
      </button>
      {user.status === 'loading' && <p>Chargement...</p>}
      {user.status === 'failed' && <p>Erreur : {user.error}</p>}
      <Link to="/signup" style={{ color: '#f0ad4e', marginTop: '10px' }}>
        Pas encore de compte ? Inscrivez-vous
      </Link>
    </div>
  );
};

export default LoginPage;
