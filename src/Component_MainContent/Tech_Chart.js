import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import "./Tech_Chart.css"; // 스타일 적용

const data = [
  {
    skill: "C++",
    level: 50,
  },
  {
    skill: "Python",
    level: 75,
  },
  {
    skill: "JavaScript",
    level: 75,
  },
  {
    skill: "Git",
    level: 65,
  },
  {
    skill: "React",
    level: 75,
  },
  {
    skill: "PL/SQL",
    level: 40,
  },
];

const RadarChart = () => (
  <div className="radar-chart-container">
    <h2>💡 My Technical Skills</h2>
    <ResponsiveRadar
      data={data}
      keys={["level"]} // 값으로 사용할 key
      indexBy="skill" // 축(index) 기준이 되는 key
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "nivo" }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default RadarChart;
