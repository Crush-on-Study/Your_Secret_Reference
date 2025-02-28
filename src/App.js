import React from "react";
import Header from "./Component_Header/Header"; // Editor 컴포넌트 불러오기
import Sidebar from "./Component_Sidebar/Sidebar";
import TechChart from "./Component_MainContent/Tech_Chart";
import CareerSection from "./Component_MainContent/CareerSection";

function App() {
  return (
    <div className="Top_Container">
        <div className="Header_Container">
            <Header />
        </div>

        <div className="Sidebar_Container">
            <Sidebar />
        </div>

        <div className="MainContent_Container">
            <div className="Tech_chart">
                <TechChart />
            </div>

            <div className="Career">
                <CareerSection />
            </div>
        </div>
    </div>
    );
}

export default App;