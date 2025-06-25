import React from "react";
import "./SortingCard.css";

const complexityInfo = {
  "Bubble Sort": {
    overview: "Bubble Sort is a simple comparison-based algorithm where each pair of adjacent elements is compared and the elements are swapped if they are not in order.",
    time: "O(n²)",
    space: "O(1)",
  },
  "Selection Sort": {
    overview: "Selection Sort repeatedly selects the minimum element from the unsorted portion and moves it to the beginning.",
    time: "O(n²)",
    space: "O(1)",
  },
  "Quick Sort": {
    overview: "Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.",
    time: "O(n log n)",
    space: "O(log n)",
  },
  "Merge Sort": {
    overview: "Merge Sort is a stable divide-and-conquer sorting algorithm that divides the array into halves, sorts them and merges them.",
    time: "O(n log n)",
    space: "O(n)",
  },
};

const SortingCard = ({ selectedAlgo }) => {
  const info = complexityInfo[selectedAlgo] || {};

  return (
    <div className="cards-container">
      <div className="card overview-card">
        <h3>{selectedAlgo} - Overview</h3>
        <p>{info.overview}</p>
      </div>
      <div className="card complexity-card">
        <h3>{selectedAlgo} - Complexity</h3>
        <p><strong>Time Complexity:</strong> {info.time}</p>
        <p><strong>Space Complexity:</strong> {info.space}</p>
      </div>
    </div>
  );
};

export default SortingCard;
