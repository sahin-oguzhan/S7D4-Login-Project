import { errorMessages } from "../../src/components/Login";

describe('Login Page', () => {
  describe('Error Messages', () => {
      it('Email input throws error for invalid type ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="form-email"]').type("oguzhanwit.com");
      cy.contains(errorMessages.email);
      });
      it('Password input throws error for invalid type ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="form-password"]').type("1234");
      cy.contains(errorMessages.password);
      });
      it('Checkbox is disabled', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="form-terms"]').should("not.be.checked");
      });
      it('Button is disabled for unvalid form ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="form-button"]').should("be.disabled");
      });
    });
  describe('Form inputs validated', () => {
      it('Email input validated', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="form-email"]').type("oguzhan@wit.com");   
      cy.get('[data-cy="form-password"]').type("12345.A*a");       
      cy.get('[data-cy="form-terms"]').check().should("be.checked"); 
      cy.get('[data-cy="form-button"]').should("be.enabled");
      });
    });
});