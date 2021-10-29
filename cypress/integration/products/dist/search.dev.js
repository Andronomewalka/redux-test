"use strict";

describe("Search products", function () {
  beforeEach(function () {
    cy.visit("products");
  });
  it("Search input works", function () {
    var searchValue = "google";
    cy.get("[data-cy=search]").should("not.be.disabled").type(searchValue).should("have.value", searchValue);
  });
  it("Search changes products list", function () {
    var searchValue = "google";
    var searchNewValue = "android";
    var fakeResponses = [[{
      id: "GGOEGEBK094499",
      name: "Google Bot",
      description: "This Google Bot can hold multiple poses making it a fun toy for all. Fold the Google Bot back up into a perfect cube when you are done playing.",
      features: "<p>Made of wood</p>\n<p>2.5 x 2.5 inch cube</p>\n<p>6.75 inch tall</p>\n<p>Recommended for Ages 3+</p>",
      price: "9.99",
      keywords: "Google Bot, google bot, bots, natural bots, wood bot, google wood bot",
      url: "Google+Bot",
      category: "accessories",
      subcategory: "accessories"
    }], [{
      id: "GGOEAFKA087499",
      name: "Android Small Removable Sticker Sheet",
      description: "Show your Android pride by placing these 8 fun stickers on your technology products or accessories!",
      features: "<p>8 Android stickers</p>\n<p>White colored sticker sheet</p>",
      price: "2.99",
      keywords: "Android Small Removable Sticker Sheet, android stickers, sticker sheets, removable sticker sheets, small sticker sheet, android small sticker sheets, Android Sheet",
      url: "Android+Small+Removable+Sticker+Sheet",
      category: "accessories",
      subcategory: "accessories"
    }]];
    cy.intercept("GET", /\/products\?.*name_like=google|description_like=google.*$/, fakeResponses[0]).as("getSearchProducts");
    cy.intercept("GET", /\/products\?.*name_like=android|description_like=android.*$/, fakeResponses[1]).as("getSearchNewProducts");
    cy.get("[data-cy=products]").as("products");
    cy.get("[data-cy=search]").as("search");
    cy.get("@search").type(searchValue).wait("@getSearchProducts").get("@products").children().should("have.length", 1).then(function ($productsList) {
      cy.log("productsList", $productsList);
      cy.get("@search").clear().type(searchNewValue).wait("@getSearchNewProducts").get("@products").children().should("have.length", 1).and("not.equal", $productsList).then(function ($newProductsList) {
        cy.log("newProductsList", $newProductsList);
      });
    });
  });
  it("Next prev buttons works", function () {
    cy.get("[data-cy=page-input]").as("pageInput");
    cy.get("@pageInput").invoke("val").then(function ($beforePrevInputValue) {
      cy.get("[data-cy=prev-page-btn]").click().get("@pageInput").should("have.value", +$beforePrevInputValue - 1);
    });
    cy.get("@pageInput").invoke("val").then(function ($beforeNextInputValue) {
      cy.get("[data-cy=next-page-btn]").click().get("@pageInput").should("have.value", +$beforeNextInputValue + 1);
    });
  });
});