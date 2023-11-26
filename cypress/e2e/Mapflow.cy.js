describe("Flow Component Test", () => {
  beforeEach(() => {
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
    //cy.visit("http://localhost:3000/map");
    cy.wait(2000);
    cy.get("button").contains("Create New").click();
    cy.get('[alt="Flow Map"]').click();
    cy.get("button").contains("Start New").click();
    cy.wait(2000);
  });

  it("should load the map and UI components correctly", () => {
    cy.get("#map").should("be.visible");
    cy.get("button").contains("Create Flow").should("be.visible");
  });

  it("should allow selecting start and end countries and cities", () => {
    // Select start country
    cy.get('[data-testid="start-country-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible"); // Ensure the dropdown is visible
    cy.get(".MuiMenu-list").contains("li", "USA").click();

    // Select start city
    cy.get('[data-testid="start-city-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "New York").click();

    // Select end country
    cy.get('[data-testid="end-country-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "FRA").click();

    // Select end city
    cy.get('[data-testid="end-city-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "Paris").click();
  });

  it("should allow adjusting line curvate with slider", () => {
    cy.get('input[type="range"]')
      .first()
      .click({ multiple: true, force: true });
  });

  it("should allow adjusting line width with slider", () => {
    cy.get('input[type="range"]').eq(1).click({ multiple: true, force: true });
  });

  it("should allow creating a flow", () => {
    // Select start country
    cy.get('[data-testid="start-country-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible"); // Ensure the dropdown is visible
    cy.get(".MuiMenu-list").contains("li", "USA").click();

    // Select start city
    cy.get('[data-testid="start-city-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "New York").click();

    // Select end country
    cy.get('[data-testid="end-country-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "FRA").click();

    // Select end city
    cy.get('[data-testid="end-city-select"]').click("top");
    cy.get(".MuiMenu-list").should("be.visible");
    cy.get(".MuiMenu-list").contains("li", "Paris").click();

    cy.get("button").contains("Create Flow").click();
    cy.get("ul").children().should("have.length.at.least", 1);
  });

  it("should allow saving the map", () => {
    cy.get("button").contains("Save").click();
  });
});
