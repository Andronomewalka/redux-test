"use strict";

describe("Search products", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/products");
  });
  it("Search input works", function () {
    var searchValue = "google";
    cy.get("[data-cy=search]").should("not.be.disabled").type(searchValue).should("have.value", searchValue);
  });
  it("Search changes products list", function () {
    var searchValue = "google";
    var searchNewValue = "apple";
    cy.get("[data-cy=search]").type(searchValue).then(function () {
      var products = cy.get("[data-cy=products]").children();
      cy.get("[data-cy=search]").clear().type(searchNewValue).then(function () {
        var newProducts = cy.get("[data-cy=products]").children();
        expect(products).not.to.eq(newProducts);
      });
    });
  });
  it("Next prev buttons works", function () {
    cy.get("[data-cy=page-input]").then(function ($pageInput) {
      var pageInputValue = $pageInput.val();
      cy.get("[data-cy=prev-page-btn]").click().then(function () {
        var newPageInputValue = $pageInput.val();
        expect(newPageInputValue).not.to.eq(pageInputValue - 1);
      });
    });
    cy.get("[data-cy=page-input]").then(function ($pageInput) {
      var pageInputValue = $pageInput.val();
      cy.get("[data-cy=next-page-btn]").click().then(function () {
        var newPageInputValue = $pageInput.val();
        expect(newPageInputValue).not.to.eq(pageInputValue + 1);
      });
    });
  });
});