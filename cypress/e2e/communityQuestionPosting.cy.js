describe("Community Question Posting Page", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
  });

  it("should display the home page correctly", () => {
    cy.contains("Trending Map Graphics").should("be.visible");
  });

  // describe("Trending Section", () => {
  //   it("should display top 5 trending graphics", () => {
  //     cy.get("[data-cy=community-trending-graphics]").should("have.length", 5);
  //   });

  // //   it("should have pagination for the graphics", () => {
  // //     cy.get("[data-cy=pagination-trending-graphics]")
  // //       .scrollIntoView()
  // //       .should("be.visible");
  // //     cy.wait(3001);
  // //    // cy.get("[data-cy=trending-container]")
  // //     //  .invoke("scrollLeft")
  // //      // .should("not.eq", 0);
  // //   });
  // //   it("pagination should be able to be flipped through", ()=>{
  // //     cy.get("[data-cy=pagination-next-button]").click

  // //   })
  // });

  it("should navigate through pagination correctly", () => {
    // Check if the first page is loaded correctly
    cy.get("[data-cy=pagination-trending-graphics]").within(() => {
      cy.get("button")
        .not(".Mui-disabled")
        .first()
        .should("have.class", "Mui-selected");
    });

    // Click on the next page button
    cy.get("[data-cy=pagination-trending-graphics]").within(() => {
      cy.get("button").contains("2").click();
    });

    // Wait for any loading or transitions
    cy.wait(1000);

    // Verify the next page is selected
    cy.get("[data-cy=pagination-trending-graphics]").within(() => {
      cy.get("button").not(".Mui-disabled").eq(2);
    });
  });
});
