import React, { useEffect, useState } from "react";
import Node from "../components/Node";
import { bfs, getPath } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import "./Maze.css";

const NUM_ROWS = 15; 
const NUM_COLS = 30;
const START = [3, 4];
const END = [10, 25];

const Maze = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [speed, setSpeed] = useState("Medium");

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  const createNode = (row, col) => ({
    row,
    col,
    isStart: row === START[0] && col === START[1],
    isEnd: row === END[0] && col === END[1],
    isVisited: false,
    isWall: false,
    previousNode: null,
  });

  const createGrid = () => {
    const newGrid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };

  const toggleWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return newGrid;
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const clearGrid = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        previousNode: null,
        isWall: node.isStart || node.isEnd ? false : node.isWall,
      }))
    );

    document.querySelectorAll(".node-visited, .node-path").forEach(el =>
      el.classList.remove("node-visited", "node-path")
    );

    setGrid(newGrid);
  };

  const getDelay = () => {
    if (speed === "Slow") return 80;
    if (speed === "Fast") return 10;
    return 30;
  };

  const visualize = (algo) => {
    clearGrid();
    const startNode = grid[START[0]][START[1]];
    const endNode = grid[END[0]][END[1]];
    const visitedNodes = algo === "BFS"
      ? bfs(grid, startNode, endNode)
      : dfs(grid, startNode, endNode);

    const path = getPath(endNode);
    animate(visitedNodes, path);
  };

  const animate = (visitedNodes, path) => {
    const delay = getDelay();
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => animatePath(path), delay * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`)?.classList.add("node-visited");
        }
      }, delay * i);
    }
  };

  const animatePath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`)?.classList.add("node-path");
        }
      }, 50 * i);
    }
  };

  return (
    <div className="maze-container">
      <h2 className="maze">Maze Visualizer</h2>
      <div className="controls">
        <button onClick={() => visualize("BFS")}>Visualize BFS</button>
        <button onClick={() => visualize("DFS")}>Visualize DFS</button>
        <button onClick={clearGrid}>Clear Grid</button>
        <select onChange={(e) => setSpeed(e.target.value)} value={speed}>
          <option>Slow</option>
          <option>Medium</option>
          <option>Fast</option>
        </select>
      </div>

      <div className="grid-wrapper">
        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  {...node}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="info-cards">
        <div className="card">
          <h3>BFS (Breadth-First Search)</h3>
          <p>Explores neighbors level-by-level. Guarantees the shortest path. Uses a queue (FIFO).</p>
        </div>
        <div className="card">
          <h3>DFS (Depth-First Search)</h3>
          <p>Explores as far as possible along a branch before backtracking. Uses a stack (or recursion).</p>
        </div>
      </div>
    </div>
  );
};

export default Maze;
