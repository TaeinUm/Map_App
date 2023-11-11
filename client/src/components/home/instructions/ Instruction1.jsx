import React, { useState, useEffect } from "react";
import "../../../styles/home.css";

function Instruction1() {
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
          animation: "moveCursorDownAndUp 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "60px",
          background: "linear-gradient(#465065, #282c34)",
          color: "#fafafa",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <div>Home</div>
        <div id="map-div">Map</div>
        <div>Community</div>
      </div>
    </div>
  );
}

export default Instruction1;
