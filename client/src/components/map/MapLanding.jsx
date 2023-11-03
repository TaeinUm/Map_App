import React, { useRef, useEffect, useState } from "react";
import "../../styles/map.css";
import {
  IconName,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

import { FiShare, FiMoreVertical, FiSearch } from "react-icons/fi";

const MapLanding = () => {
  return (
    <div className="landing-main d-flex flex-column align-items-center">
      <div className="landingtop d-flex justify-content-between">
        <p>My Graphics</p>

        <div className="export-btn d-flex justify-content-between">
          <button>Create New</button>
          <button>Load File</button>
        </div>
      </div>

      <div className="map-down d-flex justify-content-between">
        <div className="my-maps d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex">
            <input />
            <button className="search-icon">
              <FiSearch />
            </button>
          </div>
          <div className="map-item d-flex align-items-center d-flex flex-column align-items-center">
            <div className="map-graphic d-flex align-items-center justify-content-between">
              <img src="mapImageUrl" className="map-image" />
              <span>Ver 3. World map</span>
              <div className="d-flex align-items-center">
                <span className="date">2023.05.06</span>
                <button>
                  <FiShare />
                </button>
                <button>
                  <FiMoreVertical />
                </button>
              </div>
            </div>
            <div className="map-graphic d-flex align-items-center justify-content-between">
              <img src="mapImageUrl" className="map-image" />
              <span>Ver 3. World map</span>
              <div className="d-flex align-items-center">
                <span className="date">2023.05.06</span>
                <button>
                  <FiShare />
                </button>
                <button>
                  <FiMoreVertical />
                </button>
              </div>
            </div>
            <div className="map-graphic d-flex align-items-center justify-content-between">
              <img src="mapImageUrl" className="map-image" />
              <span>Ver 3. World map</span>
              <div className="d-flex align-items-center">
                <span className="date">2023.05.06</span>
                <button>
                  <FiShare />
                </button>
                <button>
                  <FiMoreVertical />
                </button>
              </div>
            </div>
          </div>
          <div className="leftRight d-flex align-items-center justify-content-center">
            <button>
              <AiOutlineArrowLeft />
            </button>
            <button>
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>

        <div className="liked-template d-flex flex-column">
          <p>Liked Templates</p>
          <div className="templates">
            <div className="template-item d-flex align-items-center">
              <img
                src="templateImageUrl"
                alt="Template"
                className="template-image"
              />
              <span className="heart-icon">❤</span>
            </div>
            <div className="template-item d-flex align-items-center">
              <img
                src="templateImageUrl"
                alt="Template"
                className="template-image"
              />
              <span className="heart-icon">❤</span>
            </div>
            <div className="template-item d-flex align-items-center">
              <img
                src="templateImageUrl"
                alt="Template"
                className="template-image"
              />
              <span className="heart-icon">❤</span>
            </div>
            <div className="template-item d-flex align-items-center">
              <img
                src="templateImageUrl"
                alt="Template"
                className="template-image"
              />
              <span className="heart-icon">❤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLanding;
