//Audio variables
const clickAudio = new Audio("./assets/click.wav");
const startAudio = new Audio("./assets/game-start.mp3");
const winAudio = new Audio("./assets/Win.wav");
const gameOverAudio = new Audio("./assets/Gameover.wav");

//start button
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", pressStart);

function pressStart() {
  startAudio.play();
  document.querySelector("#popUp").style.opacity = "0";
  document.querySelector("#container").style.opacity = "1.0";

  const rockBtn = document.querySelector("#Rock");
  const paperBtn = document.querySelector("#Paper");
  const scissorsBtn = document.querySelector("#Scissors");
  rockBtn.addEventListener("click", playerChoseRock);
  paperBtn.addEventListener("click", playerChosePaper);
  scissorsBtn.addEventListener("click", playerChoseScissors);
}

//computer image shuffle
const computerRock = document.querySelector("#computerRock");
const computerPaper = document.querySelector("#computerPaper");
const computerScissors = document.querySelector("#computerScissors");
const computerIcons = [computerRock, computerPaper, computerScissors];

let animate = true;

function animationCode() {
  for (let i = 0; i < computerIcons.length; i++) {
    (function (idx) {
      let interval = setInterval(function () {
        if (animate) {
          computerIcons[idx].style.opacity = "1.0";
          if (idx == 0) {
            computerIcons[1].style.opacity = "0";
            computerIcons[2].style.opacity = "0";
          } else if (idx == 1) {
            computerIcons[0].style.opacity = "0";
            computerIcons[2].style.opacity = "0";
          } else if (idx == 2) {
            computerIcons[0].style.opacity = "0";
            computerIcons[1].style.opacity = "0";
          }
        } else {
          clearInterval(interval);
        }
      }, 500 * (idx + 1));
    })(i);
  }
}

animationCode();

let playerChoice;
let computerChoice;

const choices = ["Rock", "Paper", "Scissors"];

//Computer choice
function computerChooses() {
  animate = false;
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerChoice = choices[randomIndex];
  computerIcons[randomIndex].style.opacity = "1.0";
  if (randomIndex == 0) {
    computerIcons[1].style.opacity = "0";
    computerIcons[2].style.opacity = "0";
  } else if (randomIndex == 1) {
    computerIcons[0].style.opacity = "0";
    computerIcons[2].style.opacity = "0";
  } else if (randomIndex == 2) {
    computerIcons[0].style.opacity = "0";
    computerIcons[1].style.opacity = "0";
  }
}

// Player choice
function playerChoseRock() {
  clickAudio.play();
  document.querySelector("#yourRock").style.opacity = "1.0";
  playerChoice = choices[0];
  document.querySelector("#yourPaper").style.opacity = "0";
  document.querySelector("#yourScissors").style.opacity = "0";
  computerChooses();
  compareChoices();
  checkWinner();
  startGame();
}

function playerChosePaper() {
  clickAudio.play();
  document.querySelector("#yourPaper").style.opacity = "1.0";
  playerChoice = choices[1];
  document.querySelector("#yourRock").style.opacity = "0";
  document.querySelector("#yourScissors").style.opacity = "0";
  computerChooses();
  compareChoices();
  checkWinner();
  startGame();
}

function playerChoseScissors() {
  clickAudio.play();
  document.querySelector("#yourScissors").style.opacity = "1.0";
  playerChoice = choices[2];
  document.querySelector("#yourPaper").style.opacity = "0";
  document.querySelector("#yourRock").style.opacity = "0";
  computerChooses();
  compareChoices();
  checkWinner();
  startGame();
}

//computer heart
const heart1 = document.querySelector("#heart1");
const heart2 = document.querySelector("#heart2");
const heart3 = document.querySelector("#heart3");
//your heart
const heart4 = document.querySelector("#heart4");
const heart5 = document.querySelector("#heart5");
const heart6 = document.querySelector("#heart6");

const playerHeart = [heart4, heart5, heart6];
const computerHeart = [heart1, heart2, heart3];

//compare player and computer choice
function compareChoices() {
  if (playerChoice === computerChoice) {
    displayResult("It's a tie!");
    playerHeart[0].style.opacity = "1.0";
    computerHeart[0].style.opacity = "1.0";
  } else if (playerChoice === choices[0]) {
    if (computerChoice === choices[1]) {
      displayResult("The computer wins this round!");
      playerHeart[0].style.opacity = "0.5";
      playerHeart.shift();
    } else {
      displayResult("You win this round!");
      computerHeart[0].style.opacity = "0.5";
      computerHeart[0].style.filter = "alpha(opacity=50)";
      computerHeart.shift();
    }
  } else if (playerChoice === choices[1]) {
    if (computerChoice === choices[2]) {
      displayResult("The computer wins this round!");
      playerHeart[0].style.opacity = "0.5";
      playerHeart.shift();
    } else {
      displayResult("You win this round!");
      computerHeart[0].style.opacity = "0.5";
      computerHeart[0].style.filter = "alpha(opacity=50)";
      computerHeart.shift();
    }
  } else if (playerChoice === choices[2]) {
    if (computerChoice === choices[0]) {
      displayResult("The computer wins this round!");
      playerHeart[0].style.opacity = "0.5";
      playerHeart.shift();
    } else {
      displayResult("You win this round!");
      computerHeart[0].style.opacity = "0.5";
      computerHeart.shift();
    }
  }
}

//result display
const resultParagraph = document.getElementById("results");

function displayResult(results) {
  resultParagraph.innerText = results;
}

//reset choice after each round
function startGame() {
  playerChoice = "";
  computerChoice = "";
}

//check the winner
function checkWinner() {
  if (playerHeart.length == 0) {
    gameOverAudio.play();
    gameOverAudio.onplay = function () {
      alert("Computer wins the game! Try again next time!");
      restart();
    };
  } else if (computerHeart.length == 0) {
    winAudio.play();
    winAudio.onplay = function () {
      alert("Congratulations! You win the game!");
      restart();
    };
  }
}

//restart game
function restart() {
  playerChoice = "";
  computerChoice = "";
  playerHeart[0] = heart4;
  playerHeart[1] = heart5;
  playerHeart[2] = heart6;
  computerHeart[0] = heart1;
  computerHeart[1] = heart2;
  computerHeart[2] = heart3;
  playerHeart[0].style.opacity = "1.0";
  playerHeart[1].style.opacity = "1.0";
  playerHeart[2].style.opacity = "1.0";
  computerHeart[0].style.opacity = "1.0";
  computerHeart[1].style.opacity = "1.0";
  computerHeart[2].style.opacity = "1.0";
  document.querySelector("#yourPaper").style.opacity = "0";
  document.querySelector("#yourRock").style.opacity = "0";
  document.querySelector("#yourScissors").style.opacity = "0";
  computerRock.style.opacity = "0";
  computerPaper.style.opacity = "0";
  computerScissors.style.opacity = "0";
  resultParagraph.textContent = "";
  document.querySelector("#popUp").style.opacity = "1.0";
  document.querySelector("#container").style.opacity = "0";
  animate = true;
  animationCode();
}
