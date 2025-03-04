import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Component_Common/ThemeContext";
import Header from "./Component_Header/Header";
import Sidebar from "./Component_Sidebar/Sidebar";
import TechChart from "./Component_MainContent/Tech_Chart";
import TechNetwork from "./Component_MainContent/Tech_Network";
import CareerSection from "./Component_MainContent/CareerSection";
import IntroCarousel from "./Component_MainContent/IntroCarousel";
import ScrollSpy from "./Component_Common/ScrollSpy";
import LoadingScreen from "./Component_Loading/LoadingScreen";
import Footer from "./Component_Footer/Footer";
import StatsGrid from "./Component_MainContent/StatsGrid";
import StatsGanttChart from "./Component_MainContent/StatsGanttChart";

// Back 관련 Import 리스트
import Database from "./Component_MainContent/Component_Database/Database";
import Network from "./Component_MainContent/Component_Network/Network";
import DataStructure from "./Component_MainContent/Component_DataStructure/DataStructure";
import OperatingSystem from "./Component_MainContent/Component_OperatingSystem/OperatingSystem";

/******************************* */
import "./App.css";

function Home() {
  return (
    <div className="MainContent_Container">
      
      {/* ✅ 캐러셀 + Stats 컨테이너 가로 정렬 */}
      <div className="AboutMeContainer">
        <div className="Intro_Carousel">
          <IntroCarousel />
        </div>
        <div className="Stats_Section">
          <StatsGrid />
          <StatsGanttChart />
        </div>
      </div>

      {/* ✅ TechChart와 TechNetwork 가로 정렬 */}
      <div className="chart">
        <div className="Tech_chart">
          <TechChart />
        </div>
        <div className="Tech_Network">
          <TechNetwork />
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
            
            {/* ✅ Header */}
            <div className="Header_Container">
              <Header />
            </div>

            <div className="Main_Container">
              
              {/* ✅ Sidebar */}
              <div className="Sidebar_Container">
                <Sidebar />
              </div>

              {/* ✅ Main Content */}
              <div className="MainContent_Container">
                <Routes>
                  
                  {/* ✅ Default Home */}
                  <Route index element={<Home />} /> 
                  <Route path="/" element={<Home />} />
                  
                  {/* ✅ 개별 페이지들도 사이드바와 함께 flex 배치 유지 */}
                  <Route path="/network" element={<div className="Network_Page_Container"><Network /></div>} />
                  <Route path="/data-structure" element={<div className="DataStructure_Page_Container"><DataStructure /></div>} />
                  <Route path="/database" element={<div className="Database_Page_Container"><Database /></div>} />
                  <Route path="/os" element={<div className="OperatingSystem_Page_Container"><OperatingSystem /></div>} />

                </Routes>
              </div>

              <ScrollSpy />
            </div>

            <Footer />
          </div>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
