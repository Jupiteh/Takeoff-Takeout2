import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider'; 
import logo from '../../assets/image/logo.png'; 
import { useTheme } from '@mui/material/styles'; // Ajouté l'importation du thème

const logoStyle = {
  width: '100px', // Ajustez la largeur selon vos besoins
  height: '50px',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const { role } = useSelector((state) => state.user);
  const theme = useTheme(); // Utilisation du thème

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const renderMenuItems = () => {
    switch (role) {
      case 'client':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('features')} sx={{ color: theme.palette.text.primary }}>Créer Commande</MenuItem>
            <MenuItem onClick={() => scrollToSection('history')} sx={{ color: theme.palette.text.primary }}>Historique</MenuItem>
            <MenuItem onClick={() => scrollToSection('tracking')} sx={{ color: theme.palette.text.primary }}>Suivi Livraison</MenuItem>
            <MenuItem onClick={() => scrollToSection('notifications')} sx={{ color: theme.palette.text.primary }}>Notifications</MenuItem>
          </>
        );
      case 'restaurateur':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('articles')} sx={{ color: theme.palette.text.primary }}>Gérer Articles</MenuItem>
            <MenuItem onClick={() => scrollToSection('menus')} sx={{ color: theme.palette.text.primary }}>Gérer Menus</MenuItem>
            <MenuItem onClick={() => scrollToSection('orders')} sx={{ color: theme.palette.text.primary }}>Visualiser Commandes</MenuItem>
            <MenuItem onClick={() => scrollToSection('statistics')} sx={{ color: theme.palette.text.primary }}>Statistiques</MenuItem>
          </>
        );
      case 'livreur':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('deliveries')} sx={{ color: theme.palette.text.primary }}>Accepter Livraisons</MenuItem>
            <MenuItem onClick={() => scrollToSection('tracking')} sx={{ color: theme.palette.text.primary }}>Suivi Livraison</MenuItem>
            <MenuItem onClick={() => scrollToSection('notifications')} sx={{ color: theme.palette.text.primary }}>Notifications</MenuItem>
          </>
        );
      case 'developpeur':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('api')} sx={{ color: theme.palette.text.primary }}>API</MenuItem>
            <MenuItem onClick={() => scrollToSection('components')} sx={{ color: theme.palette.text.primary }}>Composants Disponibles</MenuItem>
            <MenuItem onClick={() => scrollToSection('downloads')} sx={{ color: theme.palette.text.primary }}>Télécharger Composants</MenuItem>
          </>
        );
      case 'commercial':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('clients')} sx={{ color: theme.palette.text.primary }}>Gérer Comptes Clients</MenuItem>
            <MenuItem onClick={() => scrollToSection('dashboard')} sx={{ color: theme.palette.text.primary }}>Tableaux de Bord</MenuItem>
            <MenuItem onClick={() => scrollToSection('notifications')} sx={{ color: theme.palette.text.primary }}>Notifications</MenuItem>
          </>
        );
      case 'technique':
        return (
          <>
            <MenuItem onClick={() => scrollToSection('logs')} sx={{ color: theme.palette.text.primary }}>Consulter Logs</MenuItem>
            <MenuItem onClick={() => scrollToSection('performance')} sx={{ color: theme.palette.text.primary }}>Statistiques de Performances</MenuItem>
            <MenuItem onClick={() => scrollToSection('deploy')} sx={{ color: theme.palette.text.primary }}>Déploiement Services</MenuItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ width: '100px', height: '40px', overflow: 'hidden' }}>
                <img
                  src={logo} // Utilisez le logo importé ici
                  style={logoStyle}
                  alt="logo of Takeoff Takeout"
                />
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {renderMenuItems()}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Button
                color="primary"
                variant="text"
                size="small"
                component={Link}
                to="/login"
                sx={{ color: theme.palette.text.primary }} // Assurez-vous que le texte est visible
              >
                Se connecter
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component={Link}
                to="/signup"
                sx={{ color: theme.palette.text.primary }} // Assurez-vous que le texte est visible
              >
                S'inscrire
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px', color: theme.palette.text.primary }} // Assurez-vous que le texte est visible
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  {renderMenuItems()}
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/signup"
                      sx={{ width: '100%', color: theme.palette.text.primary }} // Assurez-vous que le texte est visible
                    >
                      S'inscrire
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to="/login"
                      sx={{ width: '100%', color: theme.palette.text.primary }} // Assurez-vous que le texte est visible
                    >
                      Se connecter
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
