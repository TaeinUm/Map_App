import React, { useState, useEffect } from "react";
import "../../../styles/home.css";
import inst2 from "../../../assets/images/inst2_mygraphics.png";

function Instruction2() {
  useEffect(() => {
    moveCursorDown();
  }, []);

  function moveCursorDown() {
    const cursorImg = document.querySelector(".cursor");
    if (cursorImg) {
      const currentTop = cursorImg.style.top.replace("px", "") || 0;
      const newTop = parseInt(currentTop, 10) + 30;
      cursorImg.style.top = `${newTop}px`;
      cursorImg.style.transition = "top 0.5s";
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <img
        className="cursor"
        src="https://www.freeiconspng.com/uploads/hand-pointer-hi-7.png"
        alt="Hand pointer"
        style={{
          width: "50px",
          position: "absolute",
          zIndex: "1000",
          animation: "moveCursoraround 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          height: "60px",
          background: "linear-gradient(#465065, #282c34)",
          color: "#fafafa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <div>Map Landing Page </div>
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "#282c34",
          justifyContent: "space-evenly",
        }}
      >
        <p
          style={{
            width: "120px",
            height: "50px",
            padding: "10px",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            borderRadius: "10px",
          }}
        >
          Create New
        </p>
        <p
          style={{
            width: "120px",
            height: "50px",
            padding: "10px",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            borderRadius: "10px",
          }}
        >
          Load File
        </p>
      </div>
      <div>
        <div
          style={{
            height: "60px",
            fontWeight: "bold",
            paddingTop: "20px",
            color: "#fafafa",
            backgroundColor: "#282c34",
          }}
        >
          My Graphics
        </div>
        <div style={{ backgroundColor: "#282c34" }}>
          <img src={inst2} style={{ height: "180px" }} />
        </div>
      </div>
      <div style={{ height: "240px", backgroundColor: "#282c34" }} />
    </div>
  );
}

export default Instruction2;
