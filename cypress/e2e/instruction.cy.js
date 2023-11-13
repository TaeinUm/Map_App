describe("Instruction Components Tests", () => {
  describe("Instruction1 Component Test", () => {
    beforeEach(() => {
      cy.visit("/path-to-instruction1");
    });

    it("displays the Instruction1 component with correct elements", () => {
      cy.get(".cursor").should("be.visible");
      cy.contains("Click 'Map' on the Header").should("be.visible");
      cy.get("#map-div").should("contain", "Map");
      cy.get("div").should("have.css", "background-color", "rgb(40, 44, 52)");
    });

    it("moves the cursor image down", () => {
      cy.get(".cursor")
        .invoke("css", "top")
        .then((initialTop) => {
          cy.wait(600);
          cy.get(".cursor")
            .invoke("css", "top")
            .should("not.equal", initialTop);
        });
    });
  });

  describe("Instruction2 Component Test", () => {
    beforeEach(() => {
      cy.visit("/path-to-instruction2");
    });

    it("displays the Instruction2 component with correct elements", () => {
      cy.get(".cursor").should("be.visible");
      cy.get("div").contains("Map Landing Page").should("be.visible");
      cy.get("p").contains("Create New").should("be.visible");
      cy.get("p").contains("Load File").should("be.visible");
      cy.get("div").contains("My Graphics").should("be.visible");
    });

    it("moves the cursor image down", () => {
      cy.get(".cursor")
        .invoke("css", "top")
        .then((initialTop) => {
          cy.wait(600);
          cy.get(".cursor")
            .invoke("css", "top")
            .should("not.equal", initialTop);
        });
    });
  });
});
