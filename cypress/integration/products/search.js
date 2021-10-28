describe("Search products", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/products");
  });

  it("Search input works", () => {
    const searchValue = "google";
    cy.get("[data-cy=search]")
      .should("not.be.disabled")
      .type(searchValue)
      .should("have.value", searchValue);
  });

  it("Search changes products list", () => {
    const searchValue = "google";
    const searchNewValue = "apple";

    cy.get("[data-cy=search]")
      .type(searchValue)
      .then(() => {
        const products = cy.get("[data-cy=products]").children();

        cy.get("[data-cy=search]")
          .clear()
          .type(searchNewValue)
          .then(() => {
            const newProducts = cy.get("[data-cy=products]").children();

            expect(products).not.to.eq(newProducts);
          });
      });
  });

  it("Next prev buttons works", () => {
    cy.get("[data-cy=page-input]").then(($pageInput) => {
      const pageInputValue = $pageInput.val();

      cy.get("[data-cy=prev-page-btn]")
        .click()
        .then(() => {
          const newPageInputValue = $pageInput.val();
          expect(newPageInputValue).not.to.eq(pageInputValue - 1);
        });
    });

    cy.get("[data-cy=page-input]").then(($pageInput) => {
      const pageInputValue = $pageInput.val();

      cy.get("[data-cy=next-page-btn]")
        .click()
        .then(() => {
          const newPageInputValue = $pageInput.val();
          expect(newPageInputValue).not.to.eq(pageInputValue + 1);
        });
    });
  });
});
