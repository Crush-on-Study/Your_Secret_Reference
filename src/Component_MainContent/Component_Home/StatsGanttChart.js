import React, { useState, useEffect } from "react";
import "./StatsGanttChart.css";

const GanttBar = ({ title, progress, index }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedWidth(progress);
    }, 500); // 애니메이션 시작 지연 (부드럽게 보이도록)
  }, [progress]);

  return (
    <div className="gantt-row">
      <span className="gantt-label">{title}</span>
      <div className="gantt-bar-container">
        <div
          className={`gantt-bar gantt-bar-${index}`}
          style={{ width: `${animatedWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

const StatsGanttChart = () => {
  return (
    <div className="StatsGanttChart">
      <GanttBar index={1} title="직장 생활 시작" progress={90} />
      <GanttBar index={2} title="IT 세계 입문" progress={70} />
      <GanttBar index={3} title="IT 업으로 삼음" progress={50} />
      <GanttBar index={4} title="이 웹페이지 운영" progress={30} />
    </div>
  );
};

export default StatsGanttChart;
