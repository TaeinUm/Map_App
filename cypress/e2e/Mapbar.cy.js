describe("ThreeD Component Test", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
    cy.wait(2000);
    cy.get("button").contains("Create New").click();
    cy.get('[alt="3D-Bar Map"]').click();
    cy.get("button").contains("Start New").click();
    cy.wait(2000);
  });

  it("should load the map and UI components correctly", () => {
    cy.get("#map").should("be.visible");
    cy.get("button").contains("Select Data File").should("be.visible");
    cy.get("button").contains("Submit").should("be.visible");
    cy.get("button").contains("Save").should("be.visible");
  });

  it("should handle form submission correctly", () => {
    cy.get('input[name="latitude"]').first().type("40.7128");
    cy.get('input[name="longitude"]').first().type("-74.006");
    cy.get('input[name="value"]').first().type("5");

    cy.get("button").contains("Submit").click();
  });

  it("should save the map with the selected styles and data", () => {
    cy.get("button").contains("Save").click();
  });
});
