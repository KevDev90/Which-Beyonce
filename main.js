var player1Name = document.querySelector('.player1-name');
var player2Name = document.querySelector('.player2-name');
var playNowButton = document.querySelector('.play-button');





function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none'
  return false;
}

// function changeNames() {
//   var newName2 = player2Name.innertext;
//   var newName1 = player1Name.innertext;
//   document.querySelector("player1-name").innertext === newName1;
//   document.querySelector("player2-name").innertext === newName2;
// }
//
// playNowButton.addEventListener('click', function(event) {
//   show();
//   changeNames();
// });
