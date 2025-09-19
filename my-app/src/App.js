import React from "react";
import { motion } from "framer-motion";
import "./App.css";


export default function App({
  size = 360,
  dotSize = 14,
  centerSize = 12,
  duration = 10,
}) {
  const radius = Math.round(size * 0.36);
  const circle = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  const circleRadius = radius * 0.5; 
  return { x: Math.cos(angle) * circleRadius, y: Math.sin(angle) * circleRadius };
  });
  const diamond = [
    { x: 0, y: -radius, color: "red" },     
    { x: radius, y: 0, color: "blue" },     
    { x: 0, y: radius, color: "purple" },   
    { x: -radius, y: 0, color: "orange" },  
    { x: radius * 0.7, y: -radius * 0.7, color: "blue" },
    { x: radius * 0.7, y: radius * 0.7, color: "purple" },
    { x: -radius * 0.7, y: radius * 0.7, color: "orange" },
    { x: -radius * 0.7, y: -radius * 0.7, color: "red" },
  ];
  const connections = [
    [0, 4], [4, 1], [1, 5], [5, 2], [2, 6], [6, 3], [3, 7], [7, 0],
    [4, 5], [5, 6], [6, 7], [7, 4]
  ]; 
  const times = [0, 0.3, 0.6, 1];
  return (
    <div className="app-container">
      <svg
        className="overlay-svg"
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      >    
        {diamond.map((d, i) => (
          <motion.line
            key={`center-${i}`}
            x1={0}
            y1={0}
            x2={d.x}
            y2={d.y}
            stroke="gray"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 0, 0, 1] }}
            transition={{
              duration,
              times,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror", 
            }}
          />
        ))}        
        {connections.map(([s, e], idx) => {
          const start = diamond[s];
          const end = diamond[e];
          return (
            <motion.line
              key={`edge-${idx}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="limegreen"
              strokeWidth="2"
              strokeDasharray="6,6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 0, 1] }}
              transition={{
                duration,
                times,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror", 
              }}
            />
          );
        })}        
        {diamond.map((target, i) => {
          const c = circle[i];
          return (
            <motion.circle
              key={`dot-${i}`}
              r={dotSize / 2}
              fill={target.color}
              initial={{ cx: 0, cy: 0 }}
              animate={{
                cx: [0, c.x, target.x, target.x],
                cy: [0, c.y, target.y, target.y]
              }}
              transition={{
                duration,
                times,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror", 
              }}
            />
          );
        })}
        <circle cx={0} cy={0} r={centerSize / 2} fill="black" />
      </svg>
    </div>
  );
}
