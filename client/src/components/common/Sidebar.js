import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import sidebarConfig from './sidebarConfig';
import logo from '../../logo.png'; // Assurez-vous que le chemin est correct

import sidebarStyle from '../../styles/sidebarStyle'; // Assurez-vous que le chemin est correct

// Importation des icônes spécifiques depuis Material-UI
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

// Ajouter toutes les icônes que vous utilisez dans sidebarConfig ici
const iconMap = {
  home: HomeIcon,
  user: PersonIcon,
  list: ListAltIcon,
  cart: ShoppingCartIcon,
  search: SearchIcon,
  // Ajoutez d'autres icônes si nécessaire
};

const PREFIX = 'Sidebar';

const classes = {
  drawerPaper: `${PREFIX}-drawerPaper`,
  list: `${PREFIX}-list`,
  item: `${PREFIX}-item`,
  itemLink: `${PREFIX}-itemLink`,
  itemIcon: `${PREFIX}-itemIcon`,
  itemText: `${PREFIX}-itemText`,
  logo: `${PREFIX}-logo`,
  logoLink: `${PREFIX}-logoLink`,
  logoImage: `${PREFIX}-logoImage`,
  img: `${PREFIX}-img`,
  sidebarWrapper: `${PREFIX}-sidebarWrapper`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.drawerPaper}`]: {
    ...sidebarStyle(theme).drawerPaper,
    backgroundColor: '#1c2a35 !important', // Forcer un fond approprié
  },
  [`& .${classes.logo}`]: sidebarStyle(theme).logo,
  [`& .${classes.logoLink}`]: sidebarStyle(theme).logoLink,
  [`& .${classes.logoImage}`]: sidebarStyle(theme).logoImage,
  [`& .${classes.img}`]: sidebarStyle(theme).img,
  [`& .${classes.list}`]: sidebarStyle(theme).list,
  [`& .${classes.item}`]: sidebarStyle(theme).item,
  [`& .${classes.itemLink}`]: sidebarStyle(theme).itemLink,
  [`& .${classes.itemIcon}`]: sidebarStyle(theme).itemIcon,
  [`& .${classes.itemText}`]: sidebarStyle(theme).itemText,
  [`& .${classes.sidebarWrapper}`]: sidebarStyle(theme).sidebarWrapper,
}));

const Sidebar = (props) => {
  const { role, isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return null; // Hide Sidebar if not logged in
  }

  const userSidebarItems = sidebarConfig[role] || [];

  const links = (
    <List className={classes.list}>
      {userSidebarItems.map((prop, key) => {
        const IconComponent = iconMap[prop.icon]; // Utiliser l'icône correcte depuis iconMap
        const listItemClasses = classNames({
          [' ' + classes[prop.color]]: true, // Utilisation de classNames pour les classes dynamiques
        });

        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: true, // Utilisation de classNames pour les classes dynamiques
        });

        return (
          <NavLink to={prop.path} className={classes.item} key={key}>
            <ListItem button className={classNames(classes.itemLink, listItemClasses)}>
              {IconComponent ? (
                <IconComponent className={classNames(classes.itemIcon, whiteFontClasses)} />
              ) : null}
              <ListItemText
                primary={prop.label}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  const brand = (
    <div className={classes.logo}>
      <button
        className={classNames(classes.logoLink)}
        onClick={() => window.location.href = '/'} // Remplacez l'élément <a> par un <button> pour éviter l'erreur eslint
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          textAlign: 'inherit',
          fontSize: 'inherit',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {props.logoText}
      </button>
    </div>
  );

  return (
    <Root>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.open}
          classes={{ paper: classNames(classes.drawerPaper) }}
          onClose={props.handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer anchor="left" variant="permanent" open classes={{ paper: classNames(classes.drawerPaper) }}>
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </Root>
  );
};

Sidebar.propTypes = {
  logoText: PropTypes.string,
  image: PropTypes.string,
  handleDrawerToggle: PropTypes.func,
  open: PropTypes.bool,
};

export default Sidebar;
