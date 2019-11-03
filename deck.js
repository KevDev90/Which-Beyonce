class Deck {
  constructor(task) {
    this.cards = [];
    this.matchedCards= [];
    this.selectedCards= [];
    this.item = data;
    this.complete = false;
    this.id = Date.now();
    this.matches = 0;
  }

checkSelectedCards() {
  var result = this.selectedCards[0].image === this.selectedCards[1].image;
    return result;
}

 moveToMatched(card1, card2) {
    var index1 = this.selectedCards[0].id - 1;
    var index2 = this.selectedCards[0].id - 1;
    this.allCards[index1].match();
    this.allCards[index2].match();
    this.matches++;
    var cards = {one: card1, two: card2};
    this.matchedCards.push(cards);
  }

}
