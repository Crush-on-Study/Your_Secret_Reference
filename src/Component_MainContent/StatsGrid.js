import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./StatsGrid.css";

const AnimatedCard = ({ title, startDate, unit, index }) => {
  const [days, setDays] = useState(0);
  const targetDays = dayjs().diff(dayjs(startDate), "day");

  useEffect(() => {
    let count = 0;
    const speed = 10;
    const increment = Math.ceil(targetDays / 100);

    const interval = setInterval(() => {
      count += increment;
      if (count >= targetDays) {
        setDays(targetDays);
        clearInterval(interval);
      } else {
        setDays(count);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetDays]);

  return (
    <div className={`StatsCard stats-card-${index}`}>
      <div className="StatsTitle">{title}</div>
      <div className="StatsNumber">{days.toLocaleString()} {unit}</div>
    </div>
  );
};

const StatsGrid = () => {
  return (
    <div className="StatsGrid">
      <AnimatedCard index={1} title="직장 생활을 시작한지" startDate="2021-10-25" unit="일째" />
      <AnimatedCard index={2} title="IT 세계에 발을 들인지" startDate="2023-01-16" unit="일째" />
      <AnimatedCard index={3} title="IT를 업으로 삼은지" startDate="2023-07-01" unit="일째" />
      <AnimatedCard index={4} title="이 웹페이지를 운영한지" startDate="2024-03-05" unit="일째" />
    </div>
  );
};

export default StatsGrid;
