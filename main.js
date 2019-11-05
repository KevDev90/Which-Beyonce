var rulesPlayButton = document.querySelector('#rules-play-button');
var newGameButton = document.querySelector('#new-game-button');
var imgSrc = ['images/bey1.jpg', 'images/bey2.jpg', 'images/bey3.jpeg', 'images/bey4.jpg', 'images/bey5.jpg', 'images/bey5.jpg', 'images/bey4.jpg', 'images/bey3.jpeg', 'images/bey2.jpg', 'images/bey1.jpg'];
var player1Name = null;
var player1Text = document.querySelectorAll('.player1-text');
var player2Name = null;
var player2Text = document.querySelectorAll('.player2-text');
var gameOverPage = document.querySelector('.game-over-screen');
var gameCards = document.querySelectorAll('.game-card');
var players = [];
var popupPlayerText = document.querySelector('.popup-player-text');
var gameBoard = document.querySelector('#game-board');
var rematchButton = document.querySelector('#rematch-button');
var startPlayButton = document.querySelector('#start-play-button');
var rulesScreen = document.querySelector('.rules-screen');
var gameScreen = document.querySelector('.game-screen');
var player1NameInput = document.querySelector('#start-player1-input');
var player2NameInput = document.querySelector('#start-player2-input');
var decks = null;
var player1Minutes = document.querySelector('#player1-minutes');
var player1Seconds = document.querySelector('#player1-seconds');
var player2Minutes = document.querySelector('#player2-minutes');
var player2Seconds = document.querySelector('#player2-seconds');

newGameButton.addEventListener('click', newGame);
gameBoard.addEventListener('click', runGame);
rulesPlayButton.addEventListener('click', showRules);
startPlayButton.addEventListener('click', clickStartPlayButton);
rematchButton.addEventListener('click', rematch);

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
  startTimer();
};

function clickStartPlayButton() {
  var startErrorMessage = document.querySelector('.start-error-message');
  var startScreen = document.querySelector('.start-screen');
  if (player1NameInput.value.length && player2NameInput.value.length) {
    insertNames(player1Text, player1NameInput.value.toUpperCase());
    insertNames(player2Text, player2NameInput.value.toUpperCase());
    switchSections(startScreen, rulesScreen);
    popupPlayerText.innerText = player1NameInput.value.toUpperCase();
  } else {
    showErrorMessage(startErrorMessage);
  }
};

function clearInputs() {
  player1NameInput.value = '';
  player2NameInput.value = '';
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
  matchedOrNot(event)
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
  var player = new Player({name: event.target.parentElement.children[0].children[0].innerText, beginTime: Date.now()})
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

function matchedOrNot(event) {
  for (var i = 0; i < decks.cards.length; i++) {
    if (parseInt(event.target.parentNode.dataset.id) === decks.cards[i].cardId) {
      decks.cards[i].updateSelected(decks);
    }
  }
  if (decks.selectedCards.length === 2) {
    hideMatched(event);
  }
};

function hideMatched(event) {
  var player1TurnLabel = document.querySelector('#player1-turn');
  var player2TurnLabel = document.querySelector('#player2-turn');
  var player1MatchesNumber = document.querySelector('#game-aside-player1-matches-number');
  var player2MatchesNumber = document.querySelector('#game-aside-player2-matches-number');
  var isMatch = decks.checkMatched();
  if (isMatch) {
    setTimeout(function() {
      hideCard(event)
    }, 1000);
    if (players[0].matchCount < 5) {
      players[0].matchCount++;
    }
    if (players[1]) {
      players[1].matchCount++;
      player2MatchesNumber.innerText = players[1].matchCount;
    }
    player1MatchesNumber.innerText = players[0].matchCount;
  } else {
    setTimeout(function() {
      flipCardBack(event)
    }, 3000);
  }
  if (players[0].matchCount === 5 && decks.matches === 5 && event.target.parentElement.parentElement.parentElement.parentElement.children[2].children[5].classList.contains('hidden')) {
    computeTime(players[0].beginTime, 0)
    switchSections(player1TurnLabel, player2TurnLabel);
    popupPlayerText.innerText = player2NameInput.value.toUpperCase();
    showPopup();
  }
  if (players[1] && players[1].matchCount === 5) {
    computeTime(players[1].beginTime, 1)
    switchSections(gameScreen, gameOverPage);
    switchSections(player2TurnLabel, player1TurnLabel);
    documentTime();
  }
};

function resetPlayers() {
  players = [];
};

function rematch() {
  instantiateCards();
  decks.resetCards();
  decks.shuffle(imgSrc);
  startTimer();
  showCards();
  resetPlayers();
  popupPlayerText.innerText = player1Name;
  switchSections(gameOverPage, gameScreen);
};

function startTimer() {
  timeStart = Date.now();
};

function computeTime(start, i) {
  timeEnd = Date.now();
  players[i].entireTime = (timeEnd - start)/1000;
};

function documentTime() {
  var winnerSpan = document.querySelector('.winner-text');
  totalMinutes0 = Math.floor(players[0].entireTime/60);
  totalSeconds0 = Math.round(players[0].entireTime%60);
  player1Minutes.innerText = totalMinutes0;
  player1Seconds.innerText = totalSeconds0;
  totalMinutes1 = Math.floor(players[1].entireTime/60);
  totalSeconds1 = Math.round(players[1].entireTime%60);
  player2Minutes.innerText = totalMinutes1;
  player2Seconds.innerText = totalSeconds1;
  if (players[0].entireTime < players[1].entireTime) {
    winnerSpan.innerText = players[0].name;
  } else {
    winnerSpan.innerText = players[1].name;
  }
};
