describe("Community Page", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/community");
  });


  it("should load the select bar correctly", () => {
    cy.get("[data-cy=community-select-bar]").should("exist");
  });
  it("should load the All word properly", () => {
    cy.contains("All").should("exist");
  });
  it("should load the trending map graphics for all posts correctly", () => {
    cy.get("[data-cy=all-posts-trending]").should("exist");
  });
  it("should load the questions for all posts correctly", () => {
    cy.get("[data-cy=all-posts-questions]").should("exist");
  });
  it("should load the ideas for all posts correctly", () => {
    cy.get("[data-cy=all-posts-ideas]").should("exist");
  });
  it("should load the make post button correctly", () => {
    cy.get("[data-cy=community-make-post-button]").should("exist");
  });
  it("should have the make post button as disabled", () => {
    cy.get("[data-cy=community-make-post-button]").should("be.disabled");
  });
  it("should load the questions posts once Questions is selected", () => {
    cy.get("[data-cy=community-select-bar]").find("[data-cy=community-selector-questions]").should("exist");
  });
  it("should load the ideas posts once Ideas is selected", () => {
    cy.get("[data-cy=community-select-bar]").find("[data-cy=community-selector-ideas]").should("exist");
  });
  it("should load the questions posts once Questions is selected", () => {
    cy.get("[data-cy=community-select-bar]").find("[data-cy=community-selector-questions]").click();
    cy.wait(2000);
    cy.contains("Map Ideas").should("exist");
  });
  it("should load the ideas posts once Ideas is selected", () => {
    cy.get("[data-cy=community-select-bar]").find("[data-cy=community-selector-ideas]").click();
    cy.wait(2000);
    cy.contains("Questions").should("exist");

  });
  

//   describe("Trending Section", () => {
//     it("should display top 3 trending graphics", () => {
//       cy.get("[data-cy=community-trending-graphics]").should("have.length", 3);
//     });
//   });
// });

// describe("pagination", () => {
//   it("should display pagination", () => {
//     cy.get("[data-cy=pagination-trending-graphics]").should("be.visible");
//   });
// });
// describe("pagination should be able to go to the last page", () => {
//   // iterate recursively until the "Next" link is disabled
//   // then assert we are on the last page
//   it("goes to the last page", () => {
//     const visitTextPageIfPossible = () => {
//       cy.get("[data-cy=pagination-trending-graphics]").then(($next) => {
//         if ($next.hasClass("disabled")) {
//           // we are done - we are on the last page
//           return;
//         }

//         cy.wait(500); // just for clarity
//         cy.get("[data-cy=pagination-trending-graphics]").click();
//         visitTextPageIfPossible();
//       });
//     };
//     visitTextPageIfPossible();
//     cy.log("**on the last page**");

//     // if you want to confirm the "next" list is disabled
//     cy.get("[data-cy=pagination-trending-graphics]").should(
//       "have.class",
//       "disabled"
//     );
//   });
});
