import defaultProfilePicture from 'assets/svg/icons/defaultProfilePicture.svg';

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
    settingsDeleteUser: {
      path: '/app/ustawienia/usun-uzytkownika',
      name: 'Usuń użytkownika',
    },
    settingsChangeProfile: {
      path: '/app/ustawienia/profil',
      name: 'Zmień ustawienia użytkownika',
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
  firebaseErrors: {
    'auth/user-not-found': 'Nie znaleziono użytkownika',
    'auth/email-already-in-use': 'Email jest aktualnie już używany',
    'auth/wrong-password': 'Podane hasło jest niepoprawne',
  },
  default: {
    profilePicture: defaultProfilePicture,
  },
  localStorage: {
    darkMode: 'darkModeTheme',
  },
};
