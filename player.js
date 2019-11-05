class Player {
  constructor(player) {
    // only pass in name & begintime if you change to var
    this.matchCount = 0;
    this.name = player.name
    this.entireTime = null;
    this.beginTime = player.beginTime;
    //this.bestTime = null;
    //once they finsih a round it gets setTimeout
    //lowest entireTime will be bestTime
    //once page is loaded or game is finished, iterate
    //thru players and find top 5 scores
    //players.sort(function(a,b){return a.bestTime- b.bestTime})
    //might need to flip a.bestTime;
  }
};
