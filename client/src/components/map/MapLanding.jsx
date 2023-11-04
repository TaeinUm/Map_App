import React, { useRef, useEffect, useState } from "react";
import "../../styles/map.css";
import {
  IconName,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";

import { FiShare, FiMoreVertical, FiSearch } from "react-icons/fi";

const MapLanding = () => {
  return (
    <div className="landing-main d-flex flex-column align-items-center">
      <div className="landingtop d-flex justify-content-between">
        <p>My Graphics</p>

        <div className="export-btn d-flex align-items-center">
          <button className="btn-first">Create New</button>
          <button>Load File</button>
        </div>
      </div>

      <div className="map-down d-flex">
        <div className="my-maps d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex">
            <input />
            <button className="search-icon">
              <FiSearch />
            </button>
          </div>
          <div className="map-item">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center my-3">
                  <img src="mapImageUrl" className="map-image" />
                  <span className="map-title h5 ml-3">Ver 3. World map</span>
                  <span className="date text-white ml-3">2023.05.06</span>
                  <button className="btn btn-sm ml-3">
                    <FiShare />
                  </button>
                  <button className="btn btn-sm ml-3">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="map-item">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center my-3">
                  <img src="mapImageUrl" className="map-image" />
                  <span className="map-title h5 ml-3">Ver 3. World map</span>
                  <span className="date text-white ml-3">2023.05.06</span>
                  <button className="btn btn-sm ml-3">
                    <FiShare />
                  </button>
                  <button className="btn btn-sm ml-3">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="map-item">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center my-3">
                  <img src="mapImageUrl" className="map-image" />
                  <span className="map-title h5 ml-3">Ver 3. World map</span>
                  <span className="date text-white ml-3">2023.05.06</span>
                  <button className="btn btn-sm ml-3">
                    <FiShare />
                  </button>
                  <button className="btn btn-sm ml-3">
                    <FiMoreVertical />
                  </button>
                </div>
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

        <div className="liked-template">
          <p className="text-left">Liked Templates</p>
          <form action="#" method="post" className="template">
            <ul className="template-list d-flex flex-wrap justify-content-between">
              <li className="imgList">
                <a className="img" href="/">
                  <img
                    src="mapImageUrl"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "grey",
                    }}
                  />
                </a>
                <button className="heartIcon">
                  <AiTwotoneHeart />
                </button>
              </li>
              <li className="imgList">
                <a className="img" href="/">
                  <img
                    src="mapImageUrl"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "grey",
                    }}
                  />
                </a>
                <button className="heartIcon">
                  <AiTwotoneHeart />
                </button>
              </li>
              <li className="imgList">
                <a className="img" href="/">
                  <img
                    src="mapImageUrl"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "grey",
                    }}
                  />
                </a>
                <button className="heartIcon">
                  <AiTwotoneHeart />
                </button>
              </li>
              <li className="imgList">
                <a className="img" href="/">
                  <img
                    src="mapImageUrl"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "grey",
                    }}
                  />
                </a>
                <button className="heartIcon">
                  <AiTwotoneHeart />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MapLanding;
