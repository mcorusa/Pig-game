'use strict';

let players = document.querySelectorAll('.player');

let overallScoreEl1 = document.getElementById('score--0');
let overallScoreEl2 = document.getElementById('score--1');

let currentScoreEl1 = document.getElementById('current--0');
let currentScoreEl2 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollDiceEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewGameEl = document.querySelector('.btn--new');

// initial states

let overallScore, currentScore, activePlayer, playing;

const init = function () {
    overallScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    overallScoreEl1.textContent = 0;
    overallScoreEl2.textContent = 0;
    currentScoreEl1.textContent = 0;
    currentScoreEl2.textContent = 0;

    diceEl.classList.add('hidden');

    players.forEach(player => player.classList.remove('player--winner', 'player--active'));
    players[0].classList.add('player--active');
  };

  init();



// Rolling dice functionality

btnRollDiceEl.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Checked for rolled 1 ? switch to next player : add random number to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayers(players);
    }
  }
});

function togglePlayers(players) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    players.forEach(player => {
      player.classList.toggle('player--active');
    });
  }


btnHoldEl.addEventListener('click', () => {
  if (playing) {
    overallScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      overallScore[activePlayer];

    if (overallScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      togglePlayers(players);
    }
  }
});


btnNewGameEl.addEventListener('click', init);

