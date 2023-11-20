describe("Community Page", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
    });
  
    // it("should display the search bar correctly", () => {
    //   cy.contains("Trending Map Graphics").should("be.visible");
      
    // });
  
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

    describe("Search Bar", () => {
        it("should be visible", () => {
          cy.get("[data-cy=community-search-bar]").should("be.visible");
        });
    }); 
    
    describe("Search Bar search capabilities", () => {
        it("should only show search results with the prefix Red", () => {
          cy.get("[data-cy=community-search-bar]").type("Red");
          cy.get("[data-cy=community-search-results]").should('contain', "[data-cy=community-search-result-1]");
        });
    }); 
  });