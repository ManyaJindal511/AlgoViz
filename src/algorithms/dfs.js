export function dfs(grid, start, end) {
  const stack = [start];
  const visited = [];

  while (stack.length) {
    const node = stack.pop();
    if (node.isWall || node.isVisited) continue;
    node.isVisited = true;
    visited.push(node);
    if (node === end) break;

    const neighbors = getNeighbors(node, grid);
    for (let neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = node;
        stack.push(neighbor);
      }
    }
  }

  return visited;
}

function getNeighbors(node, grid) {
  const { row, col } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}
