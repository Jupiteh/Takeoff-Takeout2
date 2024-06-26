import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../features/user/userSlice';

const ProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2b3e50;
  color: white;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #34495e;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.bgColor || '#f0ad4e'};
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: #5bc0de;
`;

const UserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching user role from Redux store
  const userRole = useSelector((state) => state.user.role);

  const handleUpdate = () => {
    // Logic to update profile
    alert('Profil mis à jour');
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    alert('Compte supprimé');
  };

  const handleGoToRestaurants = () => {
    navigate('/restaurants');
  };

  const handleGoToOrderRequests = () => {
    navigate('/order-requests');
  };

  const handleGoToDeliveryRequests = () => {
    navigate('/delivery-requests');
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <ProfilePage>
      <ProfileContainer>
        <Title>Profile</Title>
        <Input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <Button onClick={handleUpdate}>MODIFIER</Button>
        <Button bgColor="#d9534f" onClick={handleDeleteAccount}>SUPPRIMER MON COMPTE</Button>
        {userRole === 'restaurateur' && (
          <Button bgColor="#f0ad4e" onClick={handleGoToRestaurants}>Go to Restaurants</Button>
        )}
        {userRole === 'livreur' && (
          <Button bgColor="#f0ad4e" onClick={handleGoToDeliveryRequests}>Demande de livraisons</Button>
        )}
        {userRole === 'commercial' && (
          <Button bgColor="#f0ad4e" onClick={handleGoToOrderRequests}>Demande de commandes</Button>
        )}
        <Button bgColor="#5bc0de" onClick={handleLogout}>SE DECONNECTER</Button>
        {showMessage && <Message>Déconnecté avec succès</Message>}
      </ProfileContainer>
    </ProfilePage>
  );
};

export default UserPage;
