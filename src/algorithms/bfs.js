export function bfs(grid, start, end) {
  const queue = [start];
  const visited = [];

  while (queue.length) {
    const node = queue.shift();
    if (node.isWall || node.isVisited) continue;
    node.isVisited = true;
    visited.push(node);
    if (node === end) break;

    const neighbors = getNeighbors(node, grid);
    for (let neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = node;
        queue.push(neighbor);
      }
    }
  }

  return visited;
}

export function getPathFromEnd(end) {
  const path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = current.previousNode;
  }
  return path;
}

function getNeighbors(node, grid) {
  const { row, col } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
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

