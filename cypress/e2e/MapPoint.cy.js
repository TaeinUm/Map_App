describe("Point Component Test", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
    cy.wait(2000);
    cy.get("button").contains("Create New").click();
    cy.get('[alt="Point Map"]').click();
    cy.get("button").contains("Start New").click();
    cy.wait(2000);
  });

  it("should load the map and UI components correctly", () => {
    cy.get("#map").should("be.visible");
    cy.get("button").contains("Select Data File").should("be.visible");
    cy.get("form").should("be.visible");
  });

  it("should allow adding data in the table and creating markers", () => {
    cy.get('input[name="latitude"]').first().type("40.7128");
    cy.get('input[name="longitude"]').first().type("-74.006");
    cy.get('input[name="name"]').first().type("New York");

    cy.get("button").contains("+ Add Row").click();

    cy.get('input[name="latitude"]').eq(1).type("37.7749");
    cy.get('input[name="longitude"]').eq(1).type("-122.4194");
    cy.get('input[name="name"]').eq(1).type("San Francisco");
  });

  it("should submit the form and update the map with markers", () => {
    cy.get('button[type="submit"]').click();
  });

  it("should allow saving the map with markers", () => {
    cy.get("button").contains("Save").click();
  });
});
