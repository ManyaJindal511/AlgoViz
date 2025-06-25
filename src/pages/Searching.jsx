import React, { useState, useEffect, useRef } from "react";
import "./Searching.css";

const PRIMARY_COLOR = "turquoise";
const COMPARE_COLOR = "orange";
const FOUND_COLOR = "limegreen";

const generateRandomArray = (size = 27, min = 5, max = 150, sorted = false) => {
  let arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
  if (sorted) arr.sort((a, b) => a - b);
  return arr;
};

const complexities = {
  linear: {
    name: "Linear Search",
    time: "O(n)",
    space: "O(1)",
    description:
      "Linear search checks each element of the array until the target is found or the array ends.",
  },
  binary: {
    name: "Binary Search",
    time: "O(log n)",
    space: "O(1)",
    description:
      "Binary search works on sorted arrays by repeatedly dividing the search range in half.",
  },
};

const Searching = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [algorithm, setAlgorithm] = useState("linear");
  const [comparisons, setComparisons] = useState(0);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const barsRef = useRef([]);

  useEffect(() => {
    resetArray();
  }, [algorithm]);

  useEffect(() => {
    const container = document.querySelector(".bars-container");
    if (array.length <= 27) {
      container.setAttribute("data-center", "true");
    } else {
      container.removeAttribute("data-center");
    }
  }, [array]);

  const resetArray = () => {
    if (isSearching) return;
    const sorted = algorithm === "binary";
    const newArr = generateRandomArray(27, 5, 150, sorted); 
    setArray(newArr);
    setComparisons(0);
    setMessage("");
    resetBarColors(newArr.length);
  };

  const resetBarColors = (length) => {
    for (let i = 0; i < length; i++) {
      if (barsRef.current[i]) barsRef.current[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async (arr, target) => {
    setIsSearching(true);
    let comps = 0;

    for (let i = 0; i < arr.length; i++) {
      comps++;
      setComparisons(comps);
      barsRef.current[i].style.backgroundColor = COMPARE_COLOR;
      await sleep(200);

      if (arr[i] === target) {
        barsRef.current[i].style.backgroundColor = FOUND_COLOR;
        setMessage(`Element found at index ${i}`);
        setIsSearching(false);
        return;
      }

      barsRef.current[i].style.backgroundColor = PRIMARY_COLOR;
    }

    setMessage("Element not found");
    setIsSearching(false);
  };

  const binarySearch = async (arr, target) => {
    setIsSearching(true);
    let comps = 0;
    let left = 0, right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comps++;
      setComparisons(comps);
      barsRef.current[mid].style.backgroundColor = COMPARE_COLOR;
      await sleep(300);

      if (arr[mid] === target) {
        barsRef.current[mid].style.backgroundColor = FOUND_COLOR;
        setMessage(`Element found at index ${mid}`);
        setIsSearching(false);
        return;
      } else if (arr[mid] < target) {
        barsRef.current[mid].style.backgroundColor = PRIMARY_COLOR;
        left = mid + 1;
      } else {
        barsRef.current[mid].style.backgroundColor = PRIMARY_COLOR;
        right = mid - 1;
      }
    }

    setMessage("Element not found");
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (isSearching) return;
    const num = Number(target);
    if (isNaN(num) || target === "") {
      setMessage("Please enter a valid number to search");
      return;
    }
    resetBarColors(array.length);
    algorithm === "linear"
      ? linearSearch(array, num)
      : binarySearch(array, num);
  };

  return (
    <div className="searching-container">
      <h2 className="heading">Searching Algorithm Visualizer</h2>

      <div className="controls">
        <div className="custom-select-wrapper">
          <select
            className="custom-select"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSearching}
          >
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Enter Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={isSearching}
        />
        <button onClick={resetArray} disabled={isSearching}>
          Generate New Array
        </button>
        <button onClick={handleSearch} disabled={isSearching}>
          Start Search
        </button>
      </div>

      <div style={{ marginTop: "10px", fontWeight: "500", color: "#ff4444", fontSize: "16px" }}>
        {message}
      </div>

      <div className="bars-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            ref={(el) => (barsRef.current[idx] = el)}
            style={{ height: `${value * 2}px` }}
            title={value}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="info-wrapper">
        <div className="info-card">
          <h3>Algorithm Info</h3>
          <p><strong>Algorithm:</strong> {complexities[algorithm].name}</p>
          <p><strong>Time Complexity:</strong> {complexities[algorithm].time}</p>
          <p><strong>Space Complexity:</strong> {complexities[algorithm].space}</p>
          <p><strong>Comparisons:</strong> {comparisons}</p>
        </div>
        <div className="info-card">
          <h3>How It Works</h3>
          <p>{complexities[algorithm].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Searching;
