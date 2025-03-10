import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Component_Common/ThemeContext";
import Header from "./Component_Header/Header";
import Sidebar from "./Component_Sidebar/Sidebar";
import TechChart from "./Component_MainContent/Component_Home/Tech_Chart";
import TechDetails from "./Component_MainContent/Component_Home/TechDetails";
import CareerSection from "./Component_MainContent/Component_Home/CareerSection";
import IntroCarousel from "./Component_MainContent/Component_Home/IntroCarousel";
import LoadingScreen from "./Component_Loading/LoadingScreen";
import Footer from "./Component_Footer/Footer";
import StatsGrid from "./Component_MainContent/Component_Home/StatsGrid";
import StatsGanttChart from "./Component_MainContent/Component_Home/StatsGanttChart";
import ProjectList from "./Component_MainContent/Component_Home/ProjectList";
import HomePostsList from "./Component_MainContent/Component_Home/HomePostsList"; 

// ✅ Back 관련 Import 리스트
import Database from "./Component_MainContent/Component_Database/Database";
import Network from "./Component_MainContent/Component_Network/Network";
import DataStructure from "./Component_MainContent/Component_DataStructure/DataStructure";
import OperatingSystem from "./Component_MainContent/Component_OperatingSystem/OperatingSystem";
import QA from "./Component_MainContent/Component_QA/QA";
import Interview from "./Component_MainContent/Component_Interview/Interview";
import Interview_PostDetail from "./Component_MainContent/Component_Interview/Interview_PostDetail";
import PostEditor from "./Component_Common/PostEditor"; 
import Front from "./Component_MainContent/Component_FrontEnd/Front";
import Algorithm from "./Component_MainContent/Component_Algorithm/Algorithm";

import "./App.css";

/******************************* */

function Home() {
  return (
    <div className="MainContent_Container">
      <div className="Home_Posts_Section">
        <HomePostsList />
      </div>

      <div className="AboutMeContainer">
        <div className="Intro_Carousel">
          <StatsGanttChart />
          <IntroCarousel />
        </div>
        <div className="Stats_Section">
          <StatsGrid />
          <ProjectList />
        </div>
      </div>

      <div className="chart">
        <div className="Tech_chart">
          <TechChart />
        </div>
        <div className="Tech_Detail">
          <TechDetails />
        </div>
      </div>

      <div className="Career">
        <CareerSection />
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }, 4000);
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <Router>
          <div className={`Top_Container ${fadeIn ? "fade-in" : ""}`}>
            <div className="Header_Container">
              <Header />
            </div>

            <div className="Main_Container">
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

              <div className={`MainContent_Container ${isSidebarOpen ? "sidebar-open" : ""}`}>
                <Routes>
                  {/* ✅ Default Home */}
                  <Route index element={<Home />} />
                  <Route path="/" element={<Home />} />

                  {/* ✅ GNB 메뉴별 라우팅 */}
                  <Route path="/network" element={<div className="Network_Page_Container"><Network /></div>} />
                  <Route path="/data-structure" element={<div className="DataStructure_Page_Container"><DataStructure /></div>} />
                  <Route path="/database" element={<div className="Database_Page_Container"><Database /></div>} />
                  <Route path="/os" element={<div className="OperatingSystem_Page_Container"><OperatingSystem /></div>} />
                  <Route path="/qa" element={<div className="QA_Page_Container"><QA /></div>} />
                  <Route path="/frontend" element={<div className="Front_Page_Container"><Front /></div>} />
                  <Route path="/algorithm" element={<div className="Algorithm_Page_Container"><Algorithm /></div>} />

                  {/* ✅ 면접 게시판 라우팅 */}
                  <Route path="/interview" element={<Interview />} />
                  <Route path="/interview/post/:postId" element={<Interview_PostDetail />} />
                  <Route path="/interview/new" element={<PostEditor category="RealInterviewPosts" />} />
                </Routes>
              </div>
            </div>

            <Footer />
          </div>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
