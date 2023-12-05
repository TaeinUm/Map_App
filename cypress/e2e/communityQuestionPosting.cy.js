// describe("Community Question Posting Page", () => {
//   beforeEach(() => {
//     cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
//   });

//   it("should display the home page correctly", () => {
//     cy.contains("Trending Map Graphics").should("be.visible");
//   });

  //   describe("Questions page", () => {
  //     it("should contain the text Questions", () => {
  //       cy.get("[data-cy=community-select-bar]")
  //         .find("[data-cy=question-page]")
  //         .click();
  //       cy.wait(3000);
  //       cy.get("[data-cy=community-select-bar]").should(
  //         "have.value",
  //         "category1"
  //       );
  //     });
  //     it("should contain the text New Questions", () => {
  //       cy.contains("New Questions").should("exist");
  //     });
  //     it("should display the words comments section when a post is clicked on", () => {
  //       cy.contains("[data-cy=questions-buffer]").first().click();
  //       cy.wait(3000);
  //       cy.scrollTo("bottom");
  //       cy.contains("Comments Section").should("exist");
  //     });
  //     it("should allow comments to be typed into the comment box when a post is clicked on", () => {
  //       cy.get("[data-cy=comments-textarea]").type("Test comment one");
  //       cy.get("comment-button").click();
  //       cy.wait(3000);
  //       cy.contains("Test comment one").should("exist");
  //     });
  //   });
  // });

  // describe("Trending Section", () => {
  //   it("should display top 5 trending graphics", () => {
  //     cy.get("[data-cy=community-trending-graphics]").should("have.length", 5);
  //   });

  //     // //   it("should have pagination for the graphics", () => {
  //     // //     cy.get("[data-cy=pagination-trending-graphics]")
  //     // //       .scrollIntoView()
  //     // //       .should("be.visible");
  //     // //     cy.wait(3001);
  //     // //    // cy.get("[data-cy=trending-container]")
  //     // //     //  .invoke("scrollLeft")
  //     // //      // .should("not.eq", 0);
  //     // //   });
  //     // //   it("pagination should be able to be flipped through", ()=>{
  //     // //     cy.get("[data-cy=pagination-next-button]").click

  //     // //   })
  //     // });

  //     describe('pagination', () => {
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
// });
