import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { updateProfile } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Accédez à l'objet user complet de Redux
  const [profile, setProfile] = useState({
    pseudo: user.user || '',
    password: '',
    email: user.email || '',
    role: user.role || '',
    photo: user.photo || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(profile));
    toast.success('Profile updated successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 12, // Ajusté pour éviter que la page soit cachée par la AppBar
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Mon Profil
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 100, height: 100 }} src={profile.photo} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
                <PhotoCamera />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="pseudo"
                name="pseudo"
                variant="outlined"
                required
                fullWidth
                id="pseudo"
                label="Pseudo"
                autoFocus
                value={profile.pseudo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresse Email"
                name="email"
                autoComplete="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={profile.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="role"
                label="Role"
                id="role"
                value={profile.role}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Mettre à jour le profil
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
