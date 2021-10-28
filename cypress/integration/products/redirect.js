describe("Redirect to products from index", () => {
  it("Redirects", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "/products");
  });
});
