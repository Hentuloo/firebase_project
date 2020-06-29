import defaultProfilePicture from 'assets/svg/icons/defaultProfilePicture.svg';

export const Constants = {
  OFFLINE_MODE: false,
  OFF_ONLINE_STATUS: false,
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
    createAccount: {
      path: '/rejestracja',
      name: 'Rejestracja',
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
    newRoom: {
      path: '/app/nowy-pokoj',
      name: 'Pokój',
    },
    room: {
      path: '/app/room',
      name: 'Pokój',
    },
    joinRoom: {
      path: '/app/joinRoom',
      name: 'Otwieranie pokoju',
    },
    solo: {
      path: '/app/trening',
      name: 'Tryb pojedyńczy',
    },
    soloBadAccuracy: {
      path: '/app/trening/celnosc',
      name: 'Tryb pojedyńczy',
    },
  },
  firebaseErrors: {
    'auth/user-not-found': 'Nie znaleziono użytkownika',
    'auth/email-already-in-use': 'Email jest aktualnie już używany',
    'auth/wrong-password': 'Podane hasło jest niepoprawne',
    'game already is runned':
      'Gra już wystartowała, poczekaj aż użytkownicy skończą pisać',
    FirebaseError: 'Coś poszło nie tak',
  },
  default: {
    profilePicture: defaultProfilePicture,
  },
  localStorage: {
    darkMode: 'darkModeTheme',
  },
};
