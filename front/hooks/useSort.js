const funcSort = (list, type) => {
  if (type === "sort_up") {
    return list.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      if (a === b) return 0;
      else return -1;
    });
  } else if (type === "sort_down") {
    return list.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      if (a === b) return 0;
      else return -1;
    });
  }
};
