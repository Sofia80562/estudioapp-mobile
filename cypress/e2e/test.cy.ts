/// <reference types="cypress" />

const VIEWPORTS = [
  { name: 'móvil estrecho', width: 320, height: 568 },
  { name: 'móvil horizontal', width: 667, height: 375 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'escritorio', width: 1280, height: 800 },
];

const expectNoHorizontalOverflow = (): void => {
  cy.document().should((document: Document) => {
    expect(document.documentElement.scrollWidth).to.be.at.most(document.documentElement.clientWidth);
  });
};

describe('Formularios responsivos de EstudioApp', () => {
  VIEWPORTS.forEach(viewport => {
    it(`mantiene el formulario de registro dentro del viewport en ${viewport.name}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('/register');

      cy.contains('h2', 'Crea tu cuenta').should('be.visible');
      cy.get('ion-input[label="nombre"]').should('be.visible');
      cy.get('ion-input[label="correo"]').should('be.visible');
      cy.get('ion-button[type="submit"]').should('be.visible');
      expectNoHorizontalOverflow();
    });
  });
});