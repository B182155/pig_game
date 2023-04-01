'use strict';
const btnroll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

const diceImg = document.querySelector('.dice');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentscore, activeplayer, playing;
const init = function () {
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  diceImg.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  currentscore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentscore;
  activeplayer = 1 - activeplayer;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnroll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    document.getElementById(`score--${activeplayer}`).textContent =
      Number(document.getElementById(`score--${activeplayer}`).textContent) +
      currentscore;
    diceImg.classList.add('hidden');

    const winningscore = Number(
      document.getElementById(`score--${activeplayer}`).textContent
    );
    if (winningscore >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
