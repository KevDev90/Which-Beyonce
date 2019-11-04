var rulesPlayButton = document.querySelector('#rules-play-button');
var newGameButton = document.querySelector('#new-game-button');
var imgSrc = ['images/bey1.jpg', 'images/bey2.jpg', 'images/bey3.jpeg', 'images/bey4.jpg', 'images/bey5.jpg', 'images/bey5.jpg', 'images/bey4.jpg', 'images/bey3.jpeg', 'images/bey2.jpg', 'images/bey1.jpg'];
var player1Name = null;
var player1Text = document.querySelectorAll('.player1-text');
var player2Name = null;
var player2Text = document.querySelectorAll('.player2-text');
var gameOverPage = document.querySelector('.game-over-screen');
var player1TurnLabel = document.querySelector('#player1-turn');
var player2TurnLabel = document.querySelector('#player2-turn');
var gameCards = document.querySelectorAll('.game-card');
var players = [];
var popupPlayerText = document.querySelector('.popup-player-text');
var gameBoard = document.querySelector('#game-board');
var popupStartButton = document.querySelector('.popup-start-button');
var rematchButton = document.querySelector('#rematch-button');
var startErrorMessage = document.querySelector('.start-error-message');
var startPlayButton = document.querySelector('#start-play-button');
var rulesScreen = document.querySelector('.rules-screen');
var gameScreen = document.querySelector('.game-screen');
var startPlayer1Input = document.querySelector('#start-player1-input');
var startPlayer2Input = document.querySelector('#start-player2-input');
var decks = null;

newGameButton.addEventListener('click', newGame);
gameBoard.addEventListener('click', runGame);
rulesPlayButton.addEventListener('click', showRules);
startPlayButton.addEventListener('click', clickStartPlayButton);

function switchSections(hide, show) {
  hide.classList.add('hidden');
  show.classList.remove('hidden');
};

function insertNames(text, input) {
  for (var i = 0; i < text.length; i++) {
    text[i].innerText = input;
  }
};

function instantiateCards() {
  var cards = [];
  for (var i = 0; i < gameCards.length; i++) {
    var card = new Cards({cardId: gameCards[i].dataset.id, matchId: imgSrc[i]});
    cards.push(card);
  }
  var deck = new Deck({cards: cards});
  decks = deck;
};

function runGame() {
  if (event.target.classList.contains('popup-start-button')) {
    hidePopup();
  }
  if (event.target.parentNode.classList.contains('game-card') && decks.selectedCards.length < 2 && event.target.parentElement.parentElement.parentElement.children[0].classList.contains('hidden')) {
    flipCard(event);
  }
};

function newGame() {
  var startScreen = document.querySelector('.start-screen');
  decks.resetCards();
  decks.shuffle(imgSrc);
  switchSections(gameOverPage, startScreen);
  clearInputs();
  showCards();
  resetPlayers();
};

function showRules() {
  switchSections(rulesScreen, gameScreen);
  instantiateCards();
};

function clickStartPlayButton() {
  var startScreen = document.querySelector('.start-screen');
  if (startPlayer1Input.value.length && startPlayer2Input.value.length) {
    insertNames(player1Text, startPlayer1Input.value.toUpperCase());
    insertNames(player2Text, startPlayer2Input.value.toUpperCase());
    switchSections(startScreen, rulesScreen);
    popupPlayerText.innerText = startPlayer1Input.value.toUpperCase();
  } else {
    showErrorMessage(startErrorMessage);
  }
};

function clearInputs() {
  startPlayer1Input.value = '';
  startPlayer2Input.value = '';
};

function flipCardBack(event) {
  for (var i = 0; i < gameCards.length; i++) {
    if (gameCards[i].classList.contains('flipped')) {
      gameCards[i].classList.remove('flipped');
      gameCards[i].classList.add('no-match-animation');
      gameCards[i].children[0].src = 'images/B.png';
      decks.cards[i].updateSelected(decks);
      gameCards[i].classList.remove('on-click-animation');
    }
  }
};

function flipCard(event) {
  event.target.parentNode.classList.add('on-click-animation');
  event.target.parentNode.classList.remove('no-match-animation');
  event.target.src = decks.cards[event.target.parentNode.dataset.id].matchId;
  event.target.parentNode.classList.add('flipped');
};

function hideCard(event) {
  for (var i = 0; i < gameCards.length; i++) {
    if (gameCards[i].classList.contains('flipped')) {
      gameCards[i].classList.remove('flipped');
      gameCards[i].classList.add('hide-card');
      gameCards[i].classList.remove('on-click-animation');
    }
  }
};

function hidePopup(playerName) {
  event.target.parentNode.classList.add('hidden');
  var player = new Player({name: event.target.parentElement.children[0].children[0].innerText, startTime: Date.now()})
  players.push(player);
};

function showCards() {
  for (var i = 0; i < gameCards.length; i++) {
    gameCards[i].classList.remove('hide-card');
    gameCards[i].classList.remove('flipped');
    gameCards[i].classList.remove('no-match-animation');
    gameCards[i].children[0].src = 'images/B.png';
  }
};

function showErrorMessage(errorText) {
  errorText.classList.remove('hidden');
};

function showPopup() {
  event.target.parentElement.parentElement.parentElement.children[0].classList.remove('hidden');
  decks.resetCards();
  decks.shuffle(imgSrc);
  instantiateCards();
  showCards();
};
