// pages/Account.js
import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Mon Compte</h1>
      <p>Nom: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Ajoutez des formulaires pour modifier ou supprimer le compte */}
    </div>
  );
};

export default Account;
