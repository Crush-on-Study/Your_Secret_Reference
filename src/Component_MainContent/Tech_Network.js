import React from "react";
import { ResponsiveNetwork } from "@nivo/network";
import "./Tech_Network.css"; // 스타일 적용

const data = {
    nodes: [
        { id: "JavaScript", radius: 10, color: "#f7df1e" },
        { id: "React", radius: 15, color: "#61dafb" },
        { id: "Node.js", radius: 12, color: "#68a063" },
        { id: "Python", radius: 10, color: "#3572A5" },
        { id: "Django", radius: 12, color: "#092E20" },
    ],
    links: [
        { source: "JavaScript", target: "React" },
        { source: "React", target: "Node.js" },
        { source: "Python", target: "Django" },
        { source: "JavaScript", target: "Python" },
    ],
};

const TechNetwork = () => {
    return (
        <div className="Tech_network">
            <ResponsiveNetwork
                data={data}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                linkDistance={50}
                repulsivity={100}
                nodeColor={node => node.color}
                linkThickness={2}
                motionConfig="wobbly"
            />
        </div>
    );
};

export default TechNetwork;
