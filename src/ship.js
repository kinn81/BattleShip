let createShip = (len) => {
  let length = len;
  let hitCount = 0;
  let location = [];

  return {
    get length() {
      return length;
    },
    get hitCount() {
      return hitCount;
    },
    get location() {
      return location;
    },
    set hitCount(n) {
      if (n > length) return;
      hitCount = n;
    },
    set location(locArray) {
      location = locArray;
    },
    setSingleLocation(cellLoc) {
      location.push(cellLoc);
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
