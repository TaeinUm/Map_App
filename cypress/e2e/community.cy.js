describe("Community Page", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
  });

  it("should display the home page correctly", () => {
    cy.contains("Trending Map Graphics").should("be.visible");
  });

  describe("Trending Section", () => {
    it("should display top 3 trending graphics", () => {
      cy.get("[data-cy=community-trending-graphics]").should("have.length", 3);
    });
  });

  
  
});

//     describe("pagination", () => {
//         it("should display pagination", () => {
//           cy.get("[data-cy=pagination-trending-graphics]").should("be.visible");
//         });
//     });
//     describe('pagination should be able to go to the last page', () => {
//         // iterate recursively until the "Next" link is disabled
//         // then assert we are on the last page
//         it('goes to the last page', () => {
        
      
//           const visitTextPageIfPossible = () => {
//             cy.get("[data-cy=pagination-trending-graphics]").then(($next) => {
//               if ($next.hasClass('disabled')) {
//                 // we are done - we are on the last page
//                 return
//               }
      
//               cy.wait(500) // just for clarity
//               cy.get("[data-cy=pagination-trending-graphics]").click()
//               visitTextPageIfPossible()
//             })
//           }
//           visitTextPageIfPossible()
//           cy.log('**on the last page**')
          
//           // if you want to confirm the "next" list is disabled
//           cy.get("[data-cy=pagination-trending-graphics]").should('have.class', 'disabled')
//         })
//     });
            
    
//   });