var playNowButton = document.querySelector('.play-button');
var playButton2 = document.querySelector(".play-button2");
var players = [];
var cards = document.querySelectorAll(".card");



function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none'

}

function changeNames1() {
  var newName1 = document.querySelector(".player1").value;
  var newName2 = document.querySelector(".player2").value;

  players.push(newName1.toUpperCase(), newName2.toUpperCase())
}

function changeNames2() {
  var newName1 = document.querySelector(".player1").value;
  var newName2 = document.querySelector(".player2").value;

  players.push(newName1.toUpperCase(), newName2.toUpperCase())
}

playNowButton.addEventListener('click', function(event) {
  changeNames1();
  show("Page2","Page1");
  document.querySelector(".player1-name").innerText = players[0];
  document.querySelector(".player2-name").innerText = players[1];

});

playButton2.addEventListener('click', function(event) {
  changeNames2();
  show("Page3","Page2");
  document.querySelector(".player-1-name").innerText = players[0];
  document.querySelector(".player-2-name").innerText = players[1];
})

cards.forEach(function(card){
  return card.addEventListener('click', flipcard)
})

function flipcard(e) {
  console.log('flipped',e.target.id);
  }
