describe("Community Page", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
  });

  it("should display the search bar correctly", () => {
    cy.contains("Trending Map Graphics").should("be.visible");
  });

  describe("Trending Section", () => {
    it("should display top 3 trending graphics", () => {
      cy.get("[data-cy=community-trending-graphics]").should("have.length", 3);
    });
  });
});

//     describe("Search Bar", () => {
//         it("should be visible", () => {
//           cy.get("[data-cy=community-search-bar]").should("be.visible");
//         });
//     }); 
    
//     describe("Search Bar search capabilities", () => {
//         it("should only show search results with the prefix Red", () => {
//           cy.get("[data-cy=community-search-bar]").type("Red");
//           cy.get("[data-cy=community-search-results]").should('contain', );
//         });
//     }); 
//   });