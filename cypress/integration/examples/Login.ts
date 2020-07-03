// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('https://typing-page.firebaseapp.com/');
  });

  // Before login: enable account in firebase dashboard
  // https://console.firebase.google.com/project/typing-page/authentication/users?hl=PL
  // Email: testaccount@o2.pl
  it('log in to the test account', () => {
    cy.fixture('example').then(data => {
      const {
        testAccount: { email, password },
      } = data;
      cy.get('a')
        .contains('Zaloguj się')
        .click()
        .get('button')
        .contains('Mam konto!')
        .click()
        .get('input[placeholder="Email"]')
        .type(email)
        .get('input[placeholder="Password"]')
        .type(password)
        .get('button[type="submit"]')
        .click()
        .get('a[href*="/app/nowy-pokoj"]');
    });
  });
});
