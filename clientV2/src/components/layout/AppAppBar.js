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
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const logoStyle = {
  width: '100px',
  height: '50px',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { role } = useSelector((state) => state.user);
  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
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
    let items = [];
    switch (role) {
      case 'client':
        items = [
          { label: 'Créer Commande', section: 'features' },
          { label: 'Historique', section: 'history' },
          { label: 'Suivi Livraison', section: 'tracking' },
          { label: 'Notifications', section: 'notifications' }
        ];
        break;
      case 'restaurateur':
        items = [
          { label: 'Gérer Articles', section: 'articles' },
          { label: 'Gérer Menus', section: 'menus' },
          { label: 'Visualiser Commandes', section: 'orders' },
          { label: 'Statistiques', section: 'statistics' },
          { label: 'Historique', section: 'history' },
          { label: 'Parrainer', section: 'referral' }
        ];
        break;
      case 'livreur':
        items = [
          { label: 'Accepter Livraisons', section: 'deliveries' },
          { label: 'Suivi Livraison', section: 'tracking' },
          { label: 'Notifications', section: 'notifications' }
        ];
        break;
      case 'developpeur':
        items = [
          { label: 'API', section: 'api' },
          { label: 'Composants Disponibles', section: 'components' },
          { label: 'Télécharger Composants', section: 'downloads' }
        ];
        break;
      case 'commercial':
        items = [
          { label: 'Gérer Comptes Clients', section: 'clients' },
          { label: 'Tableaux de Bord', section: 'dashboard' },
          { label: 'Notifications', section: 'notifications' }
        ];
        break;
      case 'technique':
        items = [
          { label: 'Consulter Logs', section: 'logs' },
          { label: 'Statistiques de Performances', section: 'performance' },
          { label: 'Déploiement Services', section: 'deploy' }
        ];
        break;
      default:
        return null;
    }

    return (
      <>
        {items.slice(0, 5).map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => scrollToSection(item.section)}
            sx={{ color: theme.palette.text.primary }}
          >
            {item.label}
          </MenuItem>
        ))}
        {items.length > 5 && (
          <>
            <MenuItem
              aria-controls="more-menu"
              aria-haspopup="true"
              onClick={handleMoreClick}
              sx={{ color: theme.palette.text.primary }}
            >
              <MoreVertIcon />
            </MenuItem>
            <Menu
              id="more-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMoreClose}
            >
              {items.slice(5).map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleMoreClose();
                    scrollToSection(item.section);
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </>
    );
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
                  src={logo}
                  style={logoStyle}
                  alt="logo of Takeoff Takeout"
                  onClick={() => window.location.href = '/'}
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
              <IconButton sx={{ color: theme.palette.text.primary }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton component={Link} to="/profile" sx={{ color: theme.palette.text.primary }}>
                <AccountCircleIcon />
              </IconButton>
              <Button
                color="primary"
                variant="text"
                size="small"
                component={Link}
                to="/login"
                sx={{ color: theme.palette.text.primary }}
              >
                Se connecter
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component={Link}
                to="/signup"
                sx={{ color: theme.palette.text.primary }}
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
                sx={{ minWidth: '30px', p: '4px', color: theme.palette.text.primary }}
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
                      sx={{ width: '100%', color: theme.palette.text.primary }}
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
                      sx={{ width: '100%', color: theme.palette.text.primary }}
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
