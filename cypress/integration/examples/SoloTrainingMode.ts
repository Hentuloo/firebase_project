// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

describe('SoloTraining page', () => {
  beforeEach(() => {
    cy.visit('https://typing-page.firebaseapp.com/app/trening');
  });

  // Before login: enable account in firebase dashboard
  // https://console.firebase.google.com/project/typing-page/authentication/users?hl=PL
  // Email: testaccount@o2.pl
  it('Bad accurancy modal', () => {
    cy.fixture('example').then(data => {
      const { randomText } = data;
      cy.get('input:first')
        .type(randomText, { delay: 100 })
        .get('#modal')
        .contains('Hola, hola...')
        .get('button')
        .contains('Ok!')
        .click();
    });
  });
});
