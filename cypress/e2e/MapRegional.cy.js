describe("Regional Component Test", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
    cy.wait(2000);
    cy.get("button").contains("Create New").click();
    cy.get('[alt="Regional Map"]').click();
    cy.get("button").contains("Start New").click();
    cy.wait(2000);
  });

  it("should load the map and UI components correctly", () => {
    cy.get("#map").should("be.visible");
    cy.get("button").contains("Save").should("be.visible");
    cy.get('[role="tab"]').should("have.length", 2);
  });

  it("should allow changing map styles and opacity", () => {
    cy.get('input[type="color"]')
      .first()
      .invoke("val", "#FF0000")
      .trigger("change");

    cy.get('input[type="range"]')
      .first()
      .click({ multiple: true, force: true });
  });

  it("should save the map with the selected styles", () => {
    cy.get("button").contains("Save").click();
  });
});
