// ship has length, hits (increment with hits()) and isSunk()
const shipFactory = (length) => {
  return {
    length,
    life: 0,
    isSunk: function () {
      if (this.length === this.hits) return true;
      else return false;
    },
    hit: function () {
      this.hits++;
    },
  };
};

module.exports = { shipFactory };
