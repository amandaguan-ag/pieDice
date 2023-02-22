"use strict";
//Business Logic
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const rollDice = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    const diceEl = document.querySelector(".dice");
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
    } else {
      switchPlayer();
    }
  }
};
//UI logic
window.addEventListener("load", function () {
  // Initialize game
  init();

  // Event listeners for buttons
  document.querySelector(".btn--roll").addEventListener("click", rollDice);
  document.querySelector(".btn--hold").addEventListener("click", holdScore);
  document.querySelector(".btn--new").addEventListener("click", init);

  // Update UI
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".dice").classList.add("hidden");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
});
