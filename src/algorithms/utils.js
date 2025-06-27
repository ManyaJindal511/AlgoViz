export const getPath = (endNode) => {
  const path = [];
  let current = endNode;

  if (!current.previousNode && !current.isStart) return [];

  while (current !== null) {
    path.unshift(current);
    current = current.previousNode;
  }

  return path;
};

