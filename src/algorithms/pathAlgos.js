export function bfs(grid, start, end) {
  const queue = [start];
  const visited = [];
  const visitedSet = new Set();

  while (queue.length) {
    const node = queue.shift();
    const key = `${node.row}-${node.col}`;
    if (visitedSet.has(key) || node.isWall) continue;

    visitedSet.add(key);
    visited.push(node);
    node.isVisited = true;

    if (node === end) return visited;

    for (const neighbor of getNeighbors(grid, node)) {
      if (!neighbor.previousNode) neighbor.previousNode = node;
      queue.push(neighbor);
    }
  }

  return visited;
}

export function dfs(grid, start, end) {
  const stack = [start];
  const visited = [];
  const visitedSet = new Set();

  while (stack.length) {
    const node = stack.pop();
    const key = `${node.row}-${node.col}`;
    if (visitedSet.has(key) || node.isWall) continue;

    visitedSet.add(key);
    visited.push(node);
    node.isVisited = true;

    if (node === end) return visited;

    for (const neighbor of getNeighbors(grid, node)) {
      if (!neighbor.previousNode) neighbor.previousNode = node;
      stack.push(neighbor);
    }
  }

  return visited;
}

function getNeighbors(grid, node) {
  const { row, col } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export function getPath(endNode) {
  const path = [];
  let current = endNode;
  while (current !== null) {
    path.unshift(current);
    current = current.previousNode;
  }
  return path;
}
