import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useParams } from "react-router-dom";
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
import Interview from "./Component_MainContent/Component_Interview/Interview";
import Interview_PostDetail from "./Component_MainContent/Component_Interview/Interview_PostDetail";
import PostEditor from "./Component_Common/PostEditor";
import PostBoard from "./Component_Common/PostBoard";
import "./App.css";

// 게시판 카테고리와 제목 매핑
const BOARD_CATEGORIES = {
  network: { title: "🖥️ 네트워크 게시판", category: "NetworkPosts" },
  "data-structure": { title: "🖥️ 자료구조 게시판", category: "DataStructurePosts" },
  database: { title: "🖥️ 데이터베이스 게시판", category: "DatabasePosts" },
  os: { title: "🖥️ 운영체제 게시판", category: "OperatingSystemPosts" },
  qa: { title: "🖥️ QA 게시판", category: "QAPosts" },
  frontend: { title: "🖥️ 프론트엔드 게시판", category: "FrontEndPosts" },
  algorithm: { title: "🖥️ 알고리즘 게시판", category: "AlgorithmPosts" },
};

// 동적 게시판 컴포넌트
const BoardPage = () => {
  const { category } = useParams();
  const boardConfig = BOARD_CATEGORIES[category];

  if (!boardConfig) {
    return <div>존재하지 않는 게시판입니다.</div>;
  }

  return (
    <div className="MainContent_Container">
      <PostBoard title={boardConfig.title} category={boardConfig.category} />
    </div>
  );
};

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
              <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />

              <div
                className={`MainContent_Container ${
                  isSidebarOpen ? "sidebar-open" : ""
                }`}
              >
                <Routes>
                  {/* Default Home */}
                  <Route index element={<Home />} />
                  <Route path="/" element={<Home />} />

                  {/* 동적 게시판 라우팅 */}
                  <Route path="/:category" element={<BoardPage />} />

                  {/* 면접 게시판 라우팅 */}
                  <Route path="/interview" element={<Interview />} />
                  <Route
                    path="/interview/post/:postId"
                    element={<Interview_PostDetail />}
                  />
                  <Route
                    path="/interview/new"
                    element={<PostEditor category="RealInterviewPosts" />}
                  />
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