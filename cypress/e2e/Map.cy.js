describe("Map Editing and Landing Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://radiant-falls-95660-566488ce03cf.herokuapp.com/map");
  });

  it("checks if correct component is rendered based on screen size", () => {
    cy.viewport("iphone-6");
    cy.get("MapMobile").should("exist");
    cy.get("BasicStyles").should("not.exist");

    cy.viewport("macbook-15");
    cy.get("BasicStyles").should("exist");
  });

  it("opens and closes the graphic modal", () => {
    cy.get("button").contains("Create New").click();
    cy.get("MapGraphics").should("be.visible");
    cy.get('[role="presentation"]').should("be.visible");
    cy.get('[role="presentation"]').click("topRight");
    cy.get('[role="presentation"]').should("not.exist");
  });

  it("opens and closes the file modal", () => {
    cy.get("button").contains("Load File").click();
    cy.get("LoadFile").should("be.visible");
    cy.get('[role="presentation"]').should("be.visible");
    cy.get('[role="presentation"]').click("topRight");
    cy.get('[role="presentation"]').should("not.exist");
  });

  it("opens and closes the graphic modal again", () => {
    cy.get("button").contains("Create New").click();
    cy.get("MapGraphics").should("be.visible");
    cy.get('[component="div"]').contains("Basic Map").click();
    cy.get("button").contains("Start New").click();
  });

  describe("Save Tab Functionality", () => {
    beforeEach(() => {
      cy.get('[label="Save"]').contains("Save").click();
    });

    it("inputs data into Save tab form fields", () => {
      cy.get('input[name="title"]').type("Test Title");
      cy.get('select[name="versionSetting"]').select("Ver 1.");
      cy.get('select[name="exportFile"]').select("PNG");
      cy.get('select[name="privacySetting"]').select("Private");
    });

    it("clicks the save button on Save tab", () => {
      cy.get("button").contains("Save").click();
    });
  });

  describe("Share Tab Functionality", () => {
    beforeEach(() => {
      cy.get('[label="Share"]').contains("Share").click();
    });

    it("copies link and changes settings on Share tab", () => {
      cy.get("button").contains("Copy Link").click();

      cy.get('select[name="linkAccess"]').select("Public");
      cy.get('select[name="viewSetting"]').select("Private");
      cy.get('input[name="searchByUsername"]').type("testuser");
    });

    it("clicks the share button on Share tab", () => {
      cy.get("button").contains("Share").click();
    });
  });
/*
  describe("JSON Tab Functionality", () => {
    beforeEach(() => {
      cy.get('[label="JSON"]').contains("JSON").click();
    });

    it("edits JSON and saves", () => {
      cy.get("#json-editor").type('{selectall}{backspace}{"newJson": "value"}');
      cy.get("button").contains("Save JSON").click();
    });
  });*/
});