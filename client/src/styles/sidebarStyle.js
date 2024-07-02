const sidebarStyle = theme => ({
    drawerPaper: {
      border: 'none',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      width: 260,
      backgroundColor: '#2b3e50', // Assurez-vous que la couleur de fond est définie
      [theme.breakpoints.up('md')]: {
        width: 260,
        position: 'fixed',
        height: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: 260,
        position: 'fixed',
        height: '100vh',
        zIndex: 1032,
        visibility: 'visible',
        overflowY: 'visible',
        borderTop: 'none',
        textAlign: 'left',
        paddingRight: '0px',
        paddingLeft: '0',
      },
      [theme.breakpoints.down('xs')]: {
        width: 260,
        position: 'fixed',
        height: '100vh',
        zIndex: 1032,
        visibility: 'visible',
        overflowY: 'visible',
        borderTop: 'none',
        textAlign: 'left',
        paddingRight: '0px',
        paddingLeft: '0',
      },
    },
    logo: {
      padding: '15px 0',
      margin: '0',
      display: 'block',
      position: 'relative',
      zIndex: 4,
      textAlign: 'center',
    },
    logoLink: {
      fontSize: '18px',
      textTransform: 'uppercase',
      padding: '5px 0',
      display: 'block',
      fontWeight: '400',
      lineHeight: '30px',
      textDecoration: 'none',
      backgroundColor: 'transparent',
    },
    logoImage: {
      width: '35px',
      display: 'inline-block',
      maxHeight: '30px',
      marginLeft: '10px',
      marginRight: '15px',
    },
    img: {
      width: '35px',
      top: '22px',
      position: 'absolute',
      verticalAlign: 'middle',
      border: '0',
    },
    list: {
      marginTop: '20px',
      paddingLeft: '0',
      paddingTop: '0',
      paddingBottom: '0',
      marginBottom: '0',
      listStyle: 'none',
    },
    item: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
    },
    itemLink: {
      width: 'auto',
      transition: 'all 300ms linear',
      margin: '10px 15px 0',
      borderRadius: '3px',
      position: 'relative',
      display: 'block',
      padding: '10px 15px',
      backgroundColor: 'transparent',
    },
    itemIcon: {
      width: '24px',
      height: '30px',
      fontSize: '24px',
      lineHeight: '30px',
      float: 'left',
      marginRight: '15px',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    itemText: {
      margin: '0',
      lineHeight: '30px',
      fontSize: '14px',
      color: '#FFFFFF',
    },
    whiteFont: {
      color: '#FFFFFF',
    },
    background: {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      width: '100%',
      display: 'block',
      top: '0',
      left: '0',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      '&:after': {
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        height: '100%',
        content: '""',
        display: 'block',
        background: '#000',
        opacity: '.8',
      },
    },
    sidebarWrapper: {
      position: 'relative',
      height: 'calc(100vh - 75px)',
      overflow: 'auto',
      width: '260px',
      zIndex: 4,
    },
  });
  
  export default sidebarStyle;
  