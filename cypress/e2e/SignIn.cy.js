describe("SignIn Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signin");
  });

  it("should display the sign-in form", () => {
    cy.get(".sign-form").should("be.visible");
  });

  it("should allow a user to type into the email and password fields", () => {
    cy.get('input[name="email"]')
      .type("user@example.com")
      .should("have.value", "user@example.com");
    cy.get('input[name="password"]')
      .type("Password!")
      .should("have.value", "Password!");
  });

  it("should show an error for invalid email", () => {
    cy.get('input[name="email"]').type("userexample.com");
    cy.get("button").contains("Sign In").click();
    cy.get(".Mui-error").should("contain", "Invalid email address");
  });

  it("should show an error for invalid password", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("pass");
    cy.get("button").contains("Sign In").click();
    cy.get(".Mui-error").should("contain", "8 chars & include a special char");
  });

  //it("should successfully log in with correct credentials", () => {
  //  cy.get('input[name="email"]').type("validuser@example.com");
  //  cy.get('input[name="password"]').type("ValidPassword!");
  //  cy.get("button").contains("Sign In").click();
  //  cy.url().should("not.include", "/signin");
  //});

  it("should open password reset modal when click on forgot", () => {
    cy.get("button").contains("Forgot?").click();
    cy.get("#password-reset-modal-title").should("be.visible");
  });

  it("should close password reset modal when request is sent", () => {
    cy.get("button").contains("Forgot?").click();
    cy.get('input[name="resetEmail"]').type("user@example.com");
    cy.get("button").contains("Send Reset Link").click();
    cy.get("#password-reset-modal-title").should("not.exist");
  });
});
