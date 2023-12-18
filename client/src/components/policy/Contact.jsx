import React, { useState, useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact" style={{ height: "100vh" }}>
      <h1>
        <b>Contact TerraCanvas</b>
      </h1>
      <p className="update-date">Last updated: 2023.10.02</p>
      <br></br>
      <br></br>
      <section>
        <h2>General Inquiries</h2>
        <p>
          Welcome to <strong>TerraCanvas</strong>, your prime destination for
          map graphics and community services. Our platform also encompasses a
          variety of related products and services, all tailored to meet your
          mapping needs.
        </p>
        <p>
          For any questions or assistance, feel free to reach out to us. We are
          here to help!
        </p>
      </section>
      <br></br>
      <br></br>
      <h2>Contact Details</h2>
      <strong>President: </strong>Taein Um
      <br></br>
      <strong>Email: </strong>{" "}
      <a href="mailto:taein.um@stonybrook.edu">taein.um@stonybrook.edu</a>
      <br></br>
      <strong>Address: </strong> 60 North Country Road, East Setauket, New York,
      United States
      <br></br>
      <strong>Phone: </strong> 631-352-6530
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
export default Contact;
