describe("Instruction Components Tests", () => {
  describe("Instruction1 Component Test", () => {
    beforeEach(() => {
      cy.visit("https://radiant-falls-95660-566488ce03cf.herokuapp.com/");
    });

    it("should display the first instruction by default", () => {
      cy.contains("Click 'Map' on the Header").should("be.visible");
    });

    it("should change to second instruction when button is clicked", () => {
      cy.contains("2. Choose graphics or map files to edit").click();
      cy.contains("Map Landing Page").should("be.visible");
    });
  });
});
