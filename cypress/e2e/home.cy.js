describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://radiant-falls-95660-566488ce03cf.herokuapp.com/");
  });

  it("should display the home page correctly", () => {
    cy.contains("Trending Map Graphics").should("be.visible");
    cy.contains("How to Use TerraCanvas?").should("be.visible");
  });

  describe("Trending Section", () => {
    it("should display top 5 trending graphics", () => {
      cy.get("[data-cy=trending-graphic]").should("have.length", 5);
    });

    it("should automatically scroll through graphics", () => {
      cy.get("[data-cy=trending-container]")
        .scrollIntoView()
        .should("be.visible");
      cy.wait(3001);
      cy.get("[data-cy=trending-container]")
        .invoke("scrollLeft")
        .should("not.eq", 0);
    });
  });

  describe("Instruction Section", () => {
    it("should display instruction titles correctly", () => {
      cy.contains("How to Use TerraCanvas?").should("be.visible");
    });

    it("should show the selected instruction on button click", () => {
      const instructionText = "2. Choose graphics or map files to edit";
      cy.contains(instructionText).click();
      cy.contains(instructionText).should("be.visible");
    });
  });
});
