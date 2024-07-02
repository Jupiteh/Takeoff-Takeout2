import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (address.length > 3) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=5`)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data.features.map(feature => feature.properties.label));
        })
        .catch(error => {
          console.error('Error fetching address suggestions:', error);
        });
    }
  }, [address]);

  const handleSearch = () => {
    const selected = suggestions.find(suggestion => suggestion === address);
    if (selected) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${selected}&limit=1`)
        .then(response => response.json())
        .then(data => {
          const coordinates = data.features[0].geometry.coordinates;
          navigate(`/restaurants?latitude=${coordinates[1]}&longitude=${coordinates[0]}`);
        })
        .catch(error => {
          console.error('Error fetching geocode data:', error);
        });
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' }, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Découvrez les&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              meilleurs restaurants!
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: { sm: '100%', md: '80%' }, margin: '0 auto' }}
          >
            Entrez votre adresse pour une aventure culinaire incroyable! Nous vous connectons aux meilleurs restaurants locaux.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Autocomplete
              freeSolo
              options={suggestions}
              inputValue={address}
              onInputChange={(event, newInputValue) => setAddress(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  placeholder="Votre adresse"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off', // désactiver l'autocomplétion du navigateur
                    'aria-label': 'Entrez votre adresse',
                  }}
                  sx={{
                    width: '400px', // Définissez une largeur fixe pour la barre de recherche
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'background.paper',
                      '& fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.dark',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.dark',
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '1.2rem', // Taille de la police plus grande
                    },
                  }}
                />
              )}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: 'fit-content', px: 4 }}>
              Trouvez des restaurants
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            En cliquant sur "Trouvez des restaurants" vous acceptez nos&nbsp;
            <Link href="#" color="primary">
              Termes et Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage: `url(${require('../../assets/image/background.webp')})`,
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
