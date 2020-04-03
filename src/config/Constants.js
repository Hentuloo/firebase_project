import defaultProfilePicture from 'assets/svg/defaultProfilePicture.svg';

export const Constants = {
  paths: {
    root: {
      path: '/',
      name: 'Strona główna',
    },
    dashboard: {
      path: '/app/',
      name: 'Strona główna',
    },
    login: {
      path: '/logowanie',
      name: 'Logowanie',
    },
    registered: {
      path: '/hello',
      name: 'Powitanie',
    },
    settings: {
      path: '/app/ustawienia',
      name: 'Ustawienia',
    },
    room: {
      path: '/app/room',
      name: 'Pokój',
    },
    solo: {
      path: '/app/training',
      name: 'Tryb pojedyńczy',
    },
  },
  default: {
    profilePicture: defaultProfilePicture,
  },
};
