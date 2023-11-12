import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/****         Context Provider     ****/
import { AuthProvider } from "./contexts/AuthContext";
import { MapProvider } from "./contexts/MapContext";

/****         CSS & Components     ****/
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
import CommunityTwo from "./components/communityTwo/CommunityTwo";
import CommunityTwoMapIdeaPostings from "./components/communityTwo/CommunityTwoMapIdeasPostingsPage";
import CommunityPostMapGraphic from "./components/communityTwo/CommunityPostMapGraphic";
import CommunityTrendingMapGraphics from "./components/communityTwo/CommunityTrendingMapGraphics";
import CommunityTwoQuestions from "./components/communityTwo/CommunityQuestions";
import CommunityTwoMapIdeas from "./components/communityTwo/CommunityMapIdeas";
import CommunityUserName from "./components/communityTwo/CommunityUserName";
import Profile from "./components/common/Profile";
//import MapEditing from "./components/map/MapEditing";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MapProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/mapedit" element={<MapEditing />} /> */}
              <Route path="/map" element={<MapLanding />} />
              <Route path="/community" element={<CommunityTwo />} />
              <Route path="/communityMapIdeasPostings" element={<CommunityTwoMapIdeaPostings/>}/>
              <Route path="/communityPostMapGraphic" element={<CommunityPostMapGraphic/>}/>
              <Route path="/communityTrendingMaps" element={<CommunityTrendingMapGraphics/>}/>
              <Route path="/communityQuestions" element={<CommunityTwoQuestions/>}/>
              <Route path="/communityMapIdeas" element={<CommunityTwoMapIdeas/>}/>
              <Route path="/communityUserName" element={<CommunityUserName/>}/>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/termsconditions" element={<Termsconditions />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </MapProvider>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
