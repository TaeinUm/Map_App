describe("TerraCanvas Website Pages", () => {
  describe("Contact Page Tests", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/contact");
    });

    it("displays the Contact page with correct information", () => {
      cy.get(".contact").should("exist");
      cy.contains("Contact TerraCanvas").should("be.visible");
      cy.contains("Last updated: 2023.10.02").should("be.visible");
      cy.contains("General Inquiries").should("be.visible");
      cy.get('a[href="mailto:taein.um@stonybrook.edu"]').should(
        "have.text",
        "taein.um@stonybrook.edu"
      );
    });
  });

  describe("Privacy Policy Page Tests", () => {
    beforeEach(() => {
      cy.visit("https://terracanvas-fb4c23ffbf5d.herokuapp.com/privacypolicy");
    });

    it("displays the Privacy Policy page with correct information", () => {
      cy.get(".privacy-policy").should("exist");
      cy.contains("Privacy Policy (Example)").should("be.visible");
      cy.contains("Last updated:2023.11.12").should("be.visible");
      cy.contains("What User Data We Collect").should("be.visible");
    });
  });

  describe("Terms and Conditions Page Tests", () => {
    beforeEach(() => {
      cy.visit(
        "https://terracanvas-fb4c23ffbf5d.herokuapp.com/termsconditions"
      );
    });

    it("displays the Terms and Conditions page with correct information", () => {
      cy.get(".terms-conditions").should("exist");
      cy.contains("Terms and Conditions").should("be.visible");
      cy.contains("Last updated: 2023.12.11").should("be.visible");
      cy.contains("Agreement to our Legal Terms").should("be.visible");
    });
  });
});
