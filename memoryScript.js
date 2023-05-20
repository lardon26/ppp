const cartes = document.querySelectorAll('.carte');
const gameContainer = document.querySelector('.game-container');
const scoreContainer = document.querySelector('.score-container');

const nombreDeTentatives = document.querySelector('.nb_tentatives');
const nombreDePairesTrouvees = document.querySelector('.nb_paires');

const recommencerButton = document.querySelector('.recommencer');

let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let tentative = 0;
let firstCard, secondCard;
let intervalId;

function timer() {
  let nbTemps = document.getElementById('nb_temps');
  let temps = 0;
  intervalId = setInterval(() => {
    temps++;
    nbTemps.innerText = temps;
  }, 1000);
}


function incrementerTentatives() {
  let nombreDeTentatives = document.getElementById('nb_tentatives');
  tentative++;
  nombreDeTentatives.textContent = tentative;
}

function incrementerPaires() {
  let nombreDePairesTrouvees = document.getElementById('nb_paires');
  score++;
  nombreDePairesTrouvees.textContent = score;
  if (score === 6) {
    clearInterval(intervalId);
  }
}

function unflipCard() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip', 'visible');
    secondCard.classList.remove('flip', 'visible');
    resetBoard();
  }, 1000);
}
/*
function verifierPaire() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? desactiverCartes() : retournerCartes();
}*/
function verifierPaire() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip', 'visible');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  if (firstCard.dataset.class === secondCard.dataset.class) {
    desactiverCartes();
  } else {
    retournerCartes();
  }
}

function desactiverCartes() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  incrementerPaires();
  incrementerTentatives();
  resetBoard();
}

function retournerCartes() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip', 'visible');
    secondCard.classList.remove('flip', 'visible');

    incrementerTentatives();
    resetBoard();
  }, 1000);
}



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip', 'visible');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    // Vérifie si le temps est à 0 avant de démarrer le timer
    if (document.getElementById('nb_temps').innerText === "0") {
      timer();
    }
    return;
  }

  secondCard = this;
  if (firstCard.dataset.class === secondCard.dataset.class) {
    desactiverCartes();
  } else {
    retournerCartes();
  }
}

function recommencer() {
  // si le bouton recommencer est cliqué, on recharge la page
  if (recommencerButton) {
    window.location.reload();
  }
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cartes.forEach(carte => {
    let randomPos = Math.floor(Math.random() * 12);
    carte.style.order = randomPos;
  });
})();

cartes.forEach(carte => carte.addEventListener('click', flipCard));

