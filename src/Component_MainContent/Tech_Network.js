import React from "react";
import { ResponsiveNetwork } from "@nivo/network";
import data from "./Tech_NetworkData.json"; // ✅ JSON 데이터 가져오기
import "./Tech_Network.css"; // ✅ 스타일 적용

const TechNetwork = () => {
  return (
    <div className="network-chart-container">
      <h2>🌐 My Tech Network</h2>
      <ResponsiveNetwork
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance={(e) => e.distance}
        centeringStrength={0.3}
        repulsivity={6}
        nodeSize={(n) => n.size}
        activeNodeSize={(n) => 1.5 * n.size}
        nodeColor={(e) => e.color}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        linkThickness={(n) => 2 + 2 * n.target.data.height}
        linkBlendMode="multiply"
        motionConfig="wobbly"
        tooltip={({ node }) => (
          <div className="tooltip-box">
            <strong>{node.id}</strong>
            <p>Level: {node.data.height}</p>
          </div>
        )}
      />
    </div>
  );
};

export default TechNetwork;
