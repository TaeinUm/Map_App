import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PrivacyPolicy from "./components/policy/PrivacyPolicy";
import Termsconditions from "./components/policy/TermsConditions";
import Contact from "./components/policy/Contact";
import MapLanding from "./components/map/MapLanding";
import Community from "./components/community/Community";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapLanding />} />
          <Route path="/community" element={<Community />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/termsconditions" element={<Termsconditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
