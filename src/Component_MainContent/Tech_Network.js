import React, { useContext } from "react";
import { ResponsiveNetwork } from "@nivo/network";
import { ThemeContext } from "../Component_Common/ThemeContext";
import "./Tech_Network.css";
import techData from "./Tech_NetworkData.json";

// ✅ 랜덤 색상 생성 함수
const getRandomColor = (type) => {
    if (type === "parent") {
        return `hsl(${Math.random() * 40 + 200}, 70%, 50%)`; // 파란색 계열
    } else {
        return `hsl(${Math.random() * 40 + 10}, 70%, 50%)`; // 빨강/주황 계열
    }
};

const TechNetwork = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className="network-container">
            <h2 className="network-title">💡 My Technical Network</h2>

            <ResponsiveNetwork
                data={{
                    nodes: techData.nodes.map((node) => ({
                        ...node,
                        color:
                            node.color ||
                            (node.type === "parent" ? getRandomColor("parent") : getRandomColor("child"))
                    })),
                    links: techData.links
                }}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                linkDistance={80} // ✅ 노드 간 거리 확장
                centeringStrength={0.3} // ✅ 중심으로 모이는 힘 감소
                repulsivity={15} // ✅ 서로 밀어내는 힘 증가
                nodeSize={(node) => node.size}
                activeNodeSize={(node) => node.size * 1.3}
                nodeColor={(node) => node.color}
                nodeBorderWidth={1}
                nodeBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.8]]
                }}
                linkThickness={2}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                tooltip={({ node }) => (
                    <div className="network-tooltip">
                        <strong>{node.id}</strong>
                        <p>{node.data.desc || "세부 정보 없음"}</p>
                    </div>
                )}
                renderNode={(node) => (
                    <g>
                        <circle r={node.size} fill={node.color} />
                        <text
                            x={node.size + 5}
                            y={node.size / 3}
                            fontSize={12}
                            fill={isDarkMode ? "#ffffff" : "#333333"}
                        >
                            {node.label}
                        </text>
                    </g>
                )}
            />
        </div>
    );
};

export default TechNetwork;
