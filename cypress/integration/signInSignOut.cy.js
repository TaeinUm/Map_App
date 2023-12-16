describe("SignIn Page", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/");
    });
  
    it("should allow a user to login and logout of their account while displaying all UI components that allow that user to do so", () => {
      cy.contains("sign in").click();

      cy.get('input[name="email"]')
        .type("cool.kid@gmail.com")
        .should("have.value", "cool.kid@gmail.com");
      cy.get('input[name="password"]')
        .type("coolCucumber378!")
        .should("have.value", "coolCucumber378!");
      cy.get("button").contains("Sign In").click();
      cy.wait(2000);
      cy.contains("sign in").should("not.exist");
      cy.contains("logout").click();
      cy.wait(2000);
      cy.contains("sign in").should("exist");
      
      
    
      
      

    });


});