"use strict";

describe("Redirect to products from index", function () {
  it("Redirects", function () {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "/products");
  });
});