describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://radiant-falls-95660-566488ce03cf.herokuapp.com/");
  });

  it("should display the home page correctly", () => {
    cy.contains("Trending Map Graphics").should("be.visible");
    cy.contains("MAP Your Vision,").should("be.visible");
  });

  describe("Trending Section", () => {
    it("should display top 5 trending graphics", () => {
      cy.get("[data-cy=trending-graphic]").should("have.length", 5);
    });

    it("should automatically scroll through graphics", () => {
      const initialScrollAmount = 0;
      cy.wait(3001);
      cy.get("[data-cy=trending-container]")
        .scrollIntoView()
        .should("be.visible");
    });
  });

  describe("Instruction Section", () => {
    it("should display instruction titles correctly", () => {
      cy.contains("Connect Your WORLD").should("be.visible");
    });

    it("should have visible images and text for instructions", () => {
      cy.get("[data-cy=instruction-image]").should("be.visible");
      cy.get("[data-cy=instruction-text]").should("be.visible");
    });
  });
});
