import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Termsconditions from "./components/TermsConditions";
import Contact from "./components/Contact";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/termsconditions" element={<Termsconditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
