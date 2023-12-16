describe("SignIn Page", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/signin");
    });
  
    it("should allow a user to create a flow map and see the flow map in their My Graphics List", () => {
      cy.get('input[name="email"]')
        .type("cool.kid@gmail.com")
        .should("have.value", "cool.kid@gmail.com");
      cy.get('input[name="password"]')
        .type("coolCucumber378!")
        .should("have.value", "coolCucumber378!");
      cy.get("button").contains("Sign In").click();
      cy.wait(2000);
      cy.get("button").contains("map").click();
      cy.wait(2000);
      cy.get("button").contains("Create New").click();
      cy.get('[alt="Flow Map"]').click();
      cy.get("button").contains("Start New").click();
      cy.wait(2000);
      cy.get("#map").should("exist");
    //   cy.get("[data-cy=starting-country]").click();
    //   cy.contains("USA").click();
    //   cy.get("[data-cy=starting-city]").click();
    //   cy.contains("New York").click();
    //   cy.get("[data-cy=ending-country]").click();
    //   cy.contains("USA").click();
    //   cy.get("[data-cy=ending-city]").click();
    //   cy.contains("Los Angeles").click();
      cy.contains("Save").click();
      cy.get('input[name="title"]').type("noSelectDataFileOne");
      cy.get("[role=select-export-type-flow-map]").click();
      cy.contains("None").click();
      cy.get("[role=select-privacy-type-flow-map]").click();
      cy.contains("Private").click();
      cy.get('[role=savesubmitbutton]').click();
      cy.wait(2000);
      cy.contains("noSelectDataFileOne").should("exist");
      cy.contains("logout").click()
      cy.wait(2000);
      cy.contains("sign in").should("exist");
      
      

    });


});