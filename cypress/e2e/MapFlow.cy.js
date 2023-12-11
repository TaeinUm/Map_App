describe("Flow Component Test", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/map");
      cy.wait(2000);
      cy.get("button").contains("Create New").click();
      cy.get('[alt="Flow Map"]').click();
      cy.get("button").contains("Start New").click();
      cy.wait(2000);
    });
  
    it("should load the map correctly", () => {
      cy.get("#map").should("exist");
      
    });
    it("should load the button correctly", () => {
        
        cy.get("button").contains("Create Flow").should("exist");
        
    });
    // it("should load the form correctly", () => {
        
    //     cy.get("form").should("be.visible");
    // });

  
    // it("should allow adding data in the table and creating markers", () => {
    //   cy.get('input[name="latitude"]').first().type("40.7128");
    //   cy.get('input[name="longitude"]').first().type("-74.006");
    //   cy.get('input[name="name"]').first().type("New York");
  
    //   cy.get("button").contains("+ Add Row").click();
  
    //   cy.get('input[name="latitude"]').eq(1).type("37.7749");
    //   cy.get('input[name="longitude"]').eq(1).type("-122.4194");
    //   cy.get('input[name="name"]').eq(1).type("San Francisco");
    // });
  
    it("should load the color input", () => {
      cy.get("input").should("exist");
    });

    it("should load the flow curvature slider", () => {
        cy.get("[data-cy=flow-curavture]").should("exist");
    });
    //try again
    it("should load the flow width slider", () => {
    cy.get("[data-cy=flow-width]").should("exist");
    });

    it("should load the starting country textfield", () => {
    cy.get("[data-cy=starting-country]").should("exist");
    });

    it("should load the starting city textfield", () => {
    cy.get("[data-cy=starting-city]").should("exist");
    });

    it("should load the ending country textfield", () => {
    cy.get("[data-cy=ending-country]").should("exist");
    });

    it("should load the ending city textfield", () => {
    cy.get("[data-cy=ending-city]").should("exist");
    });

    it("should load the flow line opacity slider", () => {
    cy.get("[data-cy=flow-opacity]").should("exist");
    });

    it("should load the save button successfully", () => {
      cy.get("[data-cy=savebutton]").should("exist");
    });
  });
  