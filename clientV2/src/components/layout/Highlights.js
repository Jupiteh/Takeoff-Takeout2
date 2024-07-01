import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Performance adaptable',
    description: 'Notre produit s\'adapte facilement à vos besoins, améliorant l\'efficacité et simplifiant vos tâches.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Conçu pour durer',
    description: 'Découvrez une durabilité inégalée qui va au-delà avec un investissement durable.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Excellente expérience utilisateur',
    description: 'Intégrez notre produit dans votre routine avec une interface intuitive et facile à utiliser.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Fonctionnalité innovante',
    description: 'Restez en avance avec des fonctionnalités qui établissent de nouvelles normes, répondant mieux à vos besoins en évolution.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Support fiable',
    description: 'Comptez sur notre support client réactif, offrant une assistance qui va au-delà de l\'achat.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Précision dans chaque détail',
    description: 'Profitez d\'un produit méticuleusement conçu où les petites touches ont un impact significatif sur votre expérience globale.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Points forts
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Découvrez pourquoi notre produit se distingue : adaptabilité, durabilité, conception conviviale et innovation. Profitez d'un support client fiable et de la précision dans chaque détail.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
