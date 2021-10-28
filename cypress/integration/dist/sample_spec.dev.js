"use strict";

describe("My First Test", function () {
  it("Does not do much", function () {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "/products");
    cy.get("[data-cy=search]").type("some").should("have.value", "some");
    cy.get("[data-cy=products]").children().should("have.length", 1);
  });
});