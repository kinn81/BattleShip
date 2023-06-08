let createShip = (len) => {
  let length = len;
  let hitCount = 0;

  return {
    get length() {
      return length;
    },
    get hitCount() {
      return hitCount;
    },
    set hitCount(n) {
      if (n > length) return;
      hitCount = n;
    },
    hit() {
      if (hitCount + 1 > length) return false;
      hitCount++;
      return true;
    },
    isSunk() {
      if (hitCount == length) return true;
      return false;
    },
  };
};

export { createShip };
