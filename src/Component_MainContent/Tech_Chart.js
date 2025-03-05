import React, { useContext } from "react";
import { ThemeContext } from "../Component_Common/ThemeContext";
import { ResponsiveRadar } from "@nivo/radar";
import "./Tech_Chart.css";

const data = [
  { skill: "C++", level: 42 },
  { skill: "Python", level: 69 },
  { skill: "JavaScript", level: 75 },
  { skill: "Git", level: 65 },
  { skill: "React", level: 75 },
  { skill: "Ruby on Rails", level: 40 },
];

const RadarChart = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`radar-chart-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h2 className="chart-title">💡 <span className="highlight-text">My Technical Skills</span></h2>
      <ResponsiveRadar
        data={data}
        keys={["level"]}
        indexBy="skill"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={isDarkMode ? "#ffffff" : "#000000"}
        gridLabelOffset={36}
        dotSize={8} 
        dotColor={isDarkMode ? "#ffcc00" : "#333"}
        dotBorderWidth={2}
        colors={isDarkMode ? ["#ffcc00"] : ["#007bff"]}
        blendMode="normal"
        motionConfig="wobbly"
        theme={{
          textColor: isDarkMode ? "#ffcc00" : "#333", // ✅ 다크모드에서도 라벨 보이도록 변경
          axis: {
            ticks: {
              text: {
                fill: isDarkMode ? "#ffcc00" : "#333", // ✅ 축 라벨 색상 변경
                fontSize: 12,
                fontWeight: "bold",
              },
            },
          },
          grid: {
            line: {
              stroke: isDarkMode ? "#666" : "#ccc",
            },
          },
          tooltip: {
            container: {
              background: isDarkMode ? "#222" : "#ffffff",
              color: isDarkMode ? "#ffcc00" : "#333",
              borderRadius: "5px",
              padding: "10px",
            },
          },
          legends: {
            text: {
              fill: isDarkMode ? "#ffcc00" : "#999",
            },
          },
        }}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: isDarkMode ? "#ffcc00" : "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: isDarkMode ? "#ffffff" : "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RadarChart;
