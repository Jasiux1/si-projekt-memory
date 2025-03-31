const cards = document.querySelectorAll(".card");
const cardImages = [
  "./assets/cat1.jpg",
  "./assets/cat1.jpg",
  "./assets/cat2.jpg",
  "./assets/cat2.jpg",
  "./assets/cat3.jpg",
  "./assets/cat3.jpg",
  "./assets/cat4.jpg",
  "./assets/cat4.jpg",
  "./assets/cat5.jpg",
  "./assets/cat5.jpg",
  "./assets/cat6.jpg",
  "./assets/cat6.jpg",
  "./assets/cat7.jpg",
  "./assets/cat7.jpg",
  "./assets/cat8.jpg",
  "./assets/cat8.jpg",
];

let flippedCards = [];
let matchedCards = [];

const shuffledImages = [...cardImages].sort(() => Math.random() - 0.5);

cards.forEach((card, index) => {
  card.addEventListener("click", () => flipCard(card, index));
});

function flipCard(card, index) {
  if (
    flippedCards.length >= 2 ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  startTimer();
  card.classList.add("flipped");
  card.style.backgroundImage = `url(${shuffledImages[index]})`;
  flippedCards.push(card);

  if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.style.backgroundImage === secondCard.style.backgroundImage) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      stopTimer();
      setTimeout(() => {
        alert(`wygrałeś!!! Czas: ${time} sekund`);
      });
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.style.backgroundImage = "";
      secondCard.style.backgroundImage = "";
      flippedCards = [];
    }, 1000);
  }
}

let time = 0;
let timer;
let gameStarted = false;
const timerDisplay = document.getElementById("timer");

function startTimer() {
  if (!gameStarted) {
    gameStarted = true;
    timer = setInterval(() => {
      time++;
      timerDisplay.textContent = `Czas : ${time}`;
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
}
