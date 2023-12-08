// describe("Community Page", () => {
//   beforeEach(() => {
//     cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
//   });

//   it("should display the search bar correctly", () => {
//     cy.contains("Trending Map Graphics").should("be.visible");
//   });

//   describe("Trending Section", () => {
//     it("should display top 3 trending graphics", () => {
//       cy.get("[data-cy=community-trending-graphics]").should("have.length", 3);
//     });
//   });

//   describe("Community Search Bar On Trending Map Graphics Page", () => {
//     it("should exist", () => {
//       cy.get("[data-cy=community-search-bar]").should("exist");
//     });
//     // it("should allow for typing", () => {
//     //   cy.get("[data-cy=community-search-bar]")
//     //     .type("t")
//     //     .should("have.value", "t");
//     // });
//     it("should return nothing when t is provided on the Trending Map Graphics page", () => {
//       cy.get("[data-cy=community-trending-graphics]").should("have.length", 0);
//     });
//   });
//   // describe("Community Search Bar on User name page", () => {
//   //   it("should exist on the user name page", () => {
//   //     cy.get("[data-cy=community-select-bar]")
//   //       .find("[data-cy=user-name]")
//   //       .click();
//   //     cy.get("[data-cy=community-search-bar]").should("exist");
//   //   });
//   //   it("should allow for typing", () => {
//   //     cy.get("[data-cy=community-search-bar]")
//   //       .type("T")
//   //       .should("have.value", "T");
//   //   });
//   //   it("should return one entry when T is provided", () => {
//   //     cy.get("[data-cy=community-user-name-graphics]").should("have.length", 1);
//   //   });
//   // });
// });

// //     describe("Search Bar", () => {
// //         it("should be visible", () => {
// //           cy.get("[data-cy=community-search-bar]").should("be.visible");
// //         });
// //     });

// //     describe("Search Bar search capabilities", () => {
// //         it("should only show search results with the prefix Red", () => {
// //           cy.get("[data-cy=community-search-bar]").type("Red");
// //           cy.get("[data-cy=community-search-results]").should('contain', );
// //         });
// //     });
// //   });
