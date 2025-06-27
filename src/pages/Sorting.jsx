import React, { useState, useEffect } from "react";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";
import SortingCard from "../components/SortingCard";
import "./Sorting.css";

const algoMap = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
};

function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

function Sorting() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(null); 
  const [displaySize, setDisplaySize] = useState(""); 
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [speed, setSpeed] = useState("Medium");
  const [error, setError] = useState("");

  useEffect(() => {
    setArray(generateRandomArray(10));
  }, []);

  const handleGenerate = () => {
    const size = Number(displaySize);
    if (!size || size === 0) {
      setError("Array size cannot be 0.");
      return;
    }
    if (size > 10) {
      setError("Array size cannot exceed 10.");
      return;
    }
    setError("");
    setArraySize(size);
    setArray(generateRandomArray(size));
  };

  const handleReset = () => {
    setArray(generateRandomArray(array.length));
    setError("");
  };

  const handleSort = async () => {
    const size = arraySize ?? array.length;
    if (size === 0) {
      setError("Array size cannot be 0.");
      return;
    }
    if (size > 10) {
      setError("Please reduce array size to 10 or less.");
      return;
    }
    setError("");
    const delay = speed === "Slow" ? 300 : speed === "Fast" ? 50 : 150;
    const algoFunc = algoMap[selectedAlgo];
    await algoFunc([...array], setArray, delay);
  };

  return (
    <div className="sorting-container">
      <h2>Sorting Algorithm Visualizer</h2>

      <div className="controls">
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Enter array size (1–10)"
          value={displaySize}
          onChange={(e) => setDisplaySize(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate Array</button>
        <button onClick={handleReset}>Reset</button>

        <select value={selectedAlgo} onChange={(e) => setSelectedAlgo(e.target.value)}>
          {Object.keys(algoMap).map((algo) => (
            <option key={algo}>{algo}</option>
          ))}
        </select>

        <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value="Slow">Slow</option>
          <option value="Medium">Medium</option>
          <option value="Fast">Fast</option>
        </select>

        <button onClick={handleSort}>Sort</button>
      </div>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div className="bar-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 3}px`,
              width: `${Math.max(1000 / array.length, 28)}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="card-container">
        <SortingCard selectedAlgo={selectedAlgo} />
      </div>
    </div>
  );
}

export default Sorting;
