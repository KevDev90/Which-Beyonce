var playNowButton = document.querySelector('.play-button');
var playButton2 = document.querySelector(".play-button2");
// var players = [];
var players = [
  {name:null, turn:true, points:0, counter:0},
  {name:null,turn:false,points:0,counter:0}
];
var deck = []
var cards = document.querySelectorAll(".card");
var player1Input = document.querySelector('.player1');
var player2Input = document.querySelector('.player2');

function

function startGame() {


}


function show(shown, hidden) {
  document.getElementById(shown).style.display='inline-block';
  document.getElementById(hidden).style.display='none'

}

function changeNames1() {
  var newName1 = document.querySelector(".player1").value;
  var newName2 = document.querySelector(".player2").value;
  players[0].name = newName1;
  players[1].name = newName2;
  players.push(newName1.toUpperCase(), newName2.toUpperCase())
}

playNowButton.addEventListener('click', function(event) {
  console.log(player1Input.value);
  if (player1Input.value === '' || player2Input.value === '') {
     playNowButton.disabled = true;
     noNameError();
  } if (player1Input.value !== '' && player2Input.value !== ''){
    console.log('1');
    playNowButton.disabled = false;
    changeNames1();
    show("Page2","Page1");
    document.querySelector(".player1-name").innerText = players[0].name;
    document.querySelector(".player2-name").innerText = players[1].name;
  }
});

playButton2.addEventListener('click', function(event) {
  show("Page3","Page2");
  document.querySelector(".player-1-name").innerText = players[0].name;
  document.querySelector(".player-2-name").innerText = players[1].name;
})

cards.forEach(function(card){
  return card.addEventListener('click', flipCard);
})

function flipCard() {
  this.classList.toggle('flip');
  }

  function noNameError() {
  var nameError = document.getElementById("empty-name-error");
  playNowButton.style.borderColor = '#FFC30C';
  nameError.style.display = 'block';
}
