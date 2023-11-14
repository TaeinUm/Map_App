import React, { useState, useEffect } from "react";
import "../../../styles/home.css";
import process1 from "../../../assets/images/inst4_1.png";
import process2 from "../../../assets/images/inst5.png";

function Instruction5() {
  const [imgToShow, setImgToShow] = useState(process1);
  const processes = [process1, process2];

  useEffect(() => {
    const interval = setInterval(() => {
      setImgToShow(
        (prev) => processes[(processes.indexOf(prev) + 1) % processes.length]
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <img style={{ width: "100%" }} src={imgToShow} alt="Process"></img>
      </div>
    </>
  );
}

export default Instruction5;
