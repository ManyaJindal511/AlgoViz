export const quickSort = async (arr, setArray, delay) => {
  async function partition(low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return i + 1;
  }

  async function quickSortRecursive(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortRecursive(low, pi - 1);
      await quickSortRecursive(pi + 1, high);
    }
  }

  await quickSortRecursive(0, arr.length - 1);
};
