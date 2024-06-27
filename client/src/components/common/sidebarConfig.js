import {
    faUser,
    faListAlt,
    faTruck,
    faBell,
    faUtensils,
    faConciergeBell,
    faChartBar,
    faBoxOpen,
    faCogs,
    faKey,
    faDownload,
    faUsers,
  } from '@fortawesome/free-solid-svg-icons';
  
  const sidebarConfig = {
    client: [
      { path: '/account', icon: faUser, label: 'Mon Compte' },
      { path: '/orders', icon: faListAlt, label: 'Mes Commandes' },
      { path: '/order-history', icon: faListAlt, label: 'Historique des Commandes' },
      { path: '/track-delivery', icon: faTruck, label: 'Suivi de Livraison' },
      { path: '/referral', icon: faUser, label: 'Parrainer un Ami' },
      { path: '/notifications', icon: faBell, label: 'Notifications' },
    ],
    restaurateur: [
      { path: '/account', icon: faUser, label: 'Mon Compte' },
      { path: '/manage-articles', icon: faUtensils, label: 'Gérer les Articles' },
      { path: '/manage-menus', icon: faConciergeBell, label: 'Gérer les Menus' },
      { path: '/view-orders', icon: faListAlt, label: 'Visualiser Commandes' },
      { path: '/track-delivery', icon: faTruck, label: 'Suivi de Livraison' },
      { path: '/order-history', icon: faListAlt, label: 'Historique des Commandes' },
      { path: '/statistics', icon: faChartBar, label: 'Statistiques' },
      { path: '/referral', icon: faUsers, label: 'Parrainer un Restaurateur' },
      { path: '/notifications', icon: faBell, label: 'Notifications' },
    ],
    livreur: [
      { path: '/account', icon: faUser, label: 'Mon Compte' },
      { path: '/delivery-requests', icon: faBoxOpen, label: 'Demandes de Livraison' },
      { path: '/current-deliveries', icon: faTruck, label: 'Livraisons en Cours' },
      { path: '/referral', icon: faUsers, label: 'Parrainer un Livreur' },
      { path: '/notifications', icon: faBell, label: 'Notifications' },
    ],
    developpeur: [
      { path: '/account', icon: faUser, label: 'Mon Compte' },
      { path: '/api-key', icon: faKey, label: 'Gérer Clé API' },
      { path: '/components', icon: faCogs, label: 'Consulter Composants' },
      { path: '/download-component', icon: faDownload, label: 'Télécharger Composant' },
    ],
    commercial: [
      { path: '/manage-accounts', icon: faUsers, label: 'Gérer Comptes Clients' },
      { path: '/dashboard', icon: faChartBar, label: 'Tableau de Bord' },
      { path: '/notifications', icon: faBell, label: 'Notifications' },
    ],
    technicien: [
      { path: '/components', icon: faCogs, label: 'Gérer Composants' },
      { path: '/logs', icon: faListAlt, label: 'Logs de Connexion' },
      { path: '/performance-stats', icon: faChartBar, label: 'Statistiques de Performance' },
      { path: '/download-logs', icon: faDownload, label: 'Logs de Téléchargement' },
      { path: '/orchestration', icon: faCogs, label: 'Orchestrer les Routes' },
      { path: '/deploy-services', icon: faTruck, label: 'Déployer Services' },
      { path: '/notifications', icon: faBell, label: 'Notifications' },
    ],
  };
  
  export default sidebarConfig;
  