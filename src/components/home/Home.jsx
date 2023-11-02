import React, { useState, useEffect } from "react";
import "../../styles/Home.css";

const Home = () => {
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollAmount((prev) => (prev - 650) % (650 * 4));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-page">
      <section className="trending-map-graphics d-flex flex-column align-items-start">
        <h2>Trending Map Graphics</h2>
        <div
          className="map-images d-flex overflow-hidden"
          style={{ transform: `translateX(${scrollAmount}px)` }}
        >
          <div className="imgblank"> img </div>
          <div className="imgblank"> img </div>
          <div className="imgblank"> img </div>
          <div className="imgblank"> img </div>
          <div className="imgblank"> img </div>
        </div>
      </section>

      <section className="map-vision">
        <h2>MAP Your Vision, Connect Your WORLD</h2>
        <div className="vision-content">
          <div className="vision-left">
            <img src="path-to-image1.jpg" alt="Description 1" />
            <p>Instructions 1</p>
            <p>Instructions 2</p>
            <p>Instructions 3</p>
          </div>
          <div className="vision-right">
            <img src="path-to-image2.jpg" alt="Description 2" />
            <p>Instructions 4</p>
            <p>Instructions 5</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
