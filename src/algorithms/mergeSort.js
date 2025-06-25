export const mergeSort = async (arr, setArray, delay) => {
  async function merge(start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function mergeSortRecursive(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortRecursive(start, mid);
    await mergeSortRecursive(mid + 1, end);
    await merge(start, mid, end);
  }

  await mergeSortRecursive(0, arr.length - 1);
};
