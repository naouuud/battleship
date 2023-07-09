const shipFactory = (length) => {
  return {
    length,
    hits: 0,
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
