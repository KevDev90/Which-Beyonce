class Player {
  constructor(player) {
    // only pass in name & begintime if you change to var
    this.matchCount = 0;
    this.name = player.name
    this.entireTime = null;
    this.beginTime = player.beginTime;
  }

  resetMatchCount() {
    this.matchCount = 0;
  }
};
