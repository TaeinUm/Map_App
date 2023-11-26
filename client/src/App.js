import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/****         Context Provider     ****/
import { AuthProvider } from "./contexts/AuthContext";
import { MapProvider } from "./contexts/MapContext";
import { CommunityProvider } from "./contexts/CommunityContextVerTwo";

/****         CSS          ****/
import "./styles/App.css";

/****         common     ****/
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";

/****         auth         ****/
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/common/Profile";

/****         Policy           ****/
import PrivacyPolicy from "./components/policy/PrivacyPolicy";
import Termsconditions from "./components/policy/TermsConditions";
import Contact from "./components/policy/Contact";

/****         Map           ****/
import MapLanding from "./components/map/MapLanding";
import MapEditing from "./components/map/MapEditing";
import File from "./components/map/tab/control/File";
import BasicStyles from "./components/map/tab/control/BasicStyles";
import Flow from "./components/map/tab/control/Flow";
import Heat from "./components/map/tab/control/Heat";
import Point from "./components/map/tab/control/Point";
import Regional from "./components/map/tab/control/Regional";
import ThreeD from "./components/map/tab/control/ThreeD";
import MapMobile from "./components/map/landing/MapMobile";

/****         Community           ****/
import CommunityTwo from "./components/communityTwo/CommunityTwo";
import CommunityTwoMapIdeaPostings from "./components/communityTwo/CommunityTwoMapIdeasPostingsPage";
import CommunityPostMapGraphic from "./components/communityTwo/CommunityPostMapGraphic";
import CommunityTrendingMapGraphics from "./components/communityTwo/CommunityTrendingMapGraphics";
import CommunityTwoQuestions from "./components/communityTwo/CommunityQuestions";
import CommunityTwoMapIdeas from "./components/communityTwo/CommunityMapIdeas";
import CommunityUserName from "./components/communityTwo/CommunityUserName";
import CommunityTwoMapIdeasPostingsPage from "./components/communityTwo/CommunityTwoMapIdeasPostingsPage";
import CommunityQuestionPost from "./components/communityTwo/CommunityQuestionPost";
import CommunityGraphicPost from "./components/communityTwo/CommunityGraphicsPost";

import NotFound from "./components/common/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CommunityProvider>
            <MapProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mapedit" element={<MapEditing />} />
                <Route path="/map" element={<MapLanding />} />
                <Route path="/mapedit/basic" element={<BasicStyles />} />
                <Route path="/mapedit/flow" element={<Flow />} />
                <Route path="/mapedit/heat" element={<Heat />} />
                <Route path="/mapedit/point" element={<Point />} />
                <Route path="/mapedit/regional" element={<Regional />} />
                <Route path="/mapedit/3d" element={<ThreeD />} />
                <Route path="/mapedit/file" element={<File />} />
                <Route path="/mobilemap" element={<MapMobile />} />

                <Route path="/community" element={<CommunityTwo />} />
                <Route
                  path="/communityMapIdeasPostings"
                  element={<CommunityTwoMapIdeaPostings />}
                />
                <Route
                  path="/communityPostMapGraphic"
                  element={<CommunityPostMapGraphic />}
                />
                <Route
                  path="/communityTrendingMaps"
                  element={<CommunityTrendingMapGraphics />}
                />
                <Route
                  path="/communityQuestions"
                  element={<CommunityTwoQuestions />}
                />
                <Route
                  path="/communityMapIdeas"
                  element={<CommunityTwoMapIdeas />}
                />
                <Route
                  path="/communityUserName"
                  element={<CommunityUserName />}
                />
                <Route
                  path="/communityMapIdeaPost/:index"
                  element={<CommunityTwoMapIdeasPostingsPage />}
                />
                <Route
                  path="/communityQuestionPost/:postsTitle"
                  element={<CommunityQuestionPost />}
                />
                <Route
                  path="/communityGraphicPost/:index"
                  element={<CommunityGraphicPost />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/termsconditions" element={<Termsconditions />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </MapProvider>
          </CommunityProvider>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
