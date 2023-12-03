import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/****         Context Provider     ****/
import { AuthProvider } from "./contexts/AuthContext";
import { MapProvider } from "./contexts/MapContext";
import { CommunityProvider } from "./contexts/CommunityContextVerTwo";
import { PasswordRecoveryProvider } from "./contexts/PasswordRecoveryContext";

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
import OTPPage from "./components/auth/OTPPage";

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
import CommunityTwo from "./components/communityTwo/CommunityMain";
import PostMapGraphic from "./components/communityTwo/Posting";
import TrendingMapGraphics from "./components/communityTwo/TrendingMapGraphics";
import Post from "./components/communityTwo/Post";

import NotFound from "./components/common/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <PasswordRecoveryProvider>
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
                  element={<Post />}
                />
                <Route
                  path="/PostMapGraphic"
                  element={<PostMapGraphic />}
                />
                <Route
                  path="/TrendingMaps"
                  element={<TrendingMapGraphics />}
                />
                <Route
                  path="/communityMapIdeaPost/:index"
                  element={<Post />}
                />
                <Route
                  path="/CommunityQuestionPost/:postsTitle"
                  element={<Post />}
                />
                <Route
                  path="/CommunityGraphicPost/:postsTitle"
                  element={<Post />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/OTPpage" element={<OTPPage/>}/>

                <Route path="/termsconditions" element={<Termsconditions />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </MapProvider>
          </CommunityProvider>
          </PasswordRecoveryProvider>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
