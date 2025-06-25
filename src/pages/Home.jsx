import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const tools = [
    {
      title: "Sorting Visualizer",
      desc: "Watch Bubble, Merge, Quick, and Selection sort in action.",
      link: "/sorting",
      emoji: "🔢",
    },
    {
      title: "Maze Visualizer",
      desc: "Visualize BFS, DFS in a grid-based maze.",
      link: "/maze",
      emoji: "🧩",
    },
    {
      title: "Searching Visualizer",
      desc: "Understand Linear and Binary Search step-by-step.",
      link: "/searching",
      emoji: "🔍",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="title">🧠 Algorithm Visualizer</h1>
      <p className="subtitle">
        Interactive visualizations for better algorithm understanding.
      </p>

      <div className="cards-container">
        {tools.map((tool, idx) => (
          <Link to={tool.link} className="card" key={idx}>
            <div className="emoji">{tool.emoji}</div>
            <h2>{tool.title}</h2>
            <p>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

