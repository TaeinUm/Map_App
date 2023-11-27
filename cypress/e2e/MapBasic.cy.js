describe("BasicStyles Component Test", () => {
  beforeEach(() => {
    // Enter the URL of your application where BasicStyles component is rendered
    cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
    cy.wait(2000);
    cy.get("button").contains("Create New").click();
    cy.get('[alt="Basic Map"]').click();
    cy.get("button").contains("Start New").click();
    cy.wait(2000);
  });

  it("should load the map correctly", () => {
    cy.get("#map").should("be.visible");
  });

  it("should allow changing layer visibility", () => {
    // changing visibility of water layer
    cy.get('input[type="checkbox"]').first().as("waterVisibilityCheckbox");
    cy.get("@waterVisibilityCheckbox").click();
    cy.get("@waterVisibilityCheckbox").should("not.be.checked");
  });

  it("should allow changing layer color", () => {
    // changing color of water layer
    cy.get('input[type="color"]').first().as("waterColorInput");
    cy.get("@waterColorInput").invoke("val", "#0000FF").trigger("change");
    cy.get("@waterColorInput").should("have.value", "#0000ff");
  });

  it("should allow adjusting font size with slider", () => {
    cy.get('input[type="range"]').eq(0).as("fontSizeSlider");
    cy.get("@fontSizeSlider").click({ multiple: true, force: true });
  });

  it("should allow adjusting road width with slider", () => {
    cy.get('input[type="range"]').eq(1).as("roadWidthSlider");
    cy.get("@roadWidthSlider").click({ multiple: true, force: true });
  });

  it("should allow adjusting boundary width with slider", () => {
    cy.get('input[type="range"]').eq(2).as("boundaryWidthSlider");
    cy.get("@boundaryWidthSlider").click({ multiple: true, force: true });
  });

  it("should allow adjusting waterway width with slider", () => {
    cy.get('input[type="range"]').eq(3).as("waterwayWidthSlider");
    cy.get("@waterwayWidthSlider").click({ multiple: true, force: true });
  });

  it("should be able to save settings", () => {
    cy.get("button").contains("Save").click();
  });
});
