const cardWraps = document.querySelectorAll(".card_wrap");
const cards = document.querySelectorAll(".card");
const timers = document.querySelector(".timer");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchPairnt = 0;
let timerInterval;
let seconds = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    startTimer();

    this.classList.add("open");

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

secondCard = this;
checkForMatch();
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timers.textContent = formatTime(seconds);
    }); 
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(time) {
    const mim = Math.floor(time / 60);
    const sec = time%60;
return `${mim.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
    matchPairnt++;
    if (matchPairnt === (cards.length / 2)) {
        stopTimer();
        setTimeout(() => {
            alert("agua com gas");
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    firstCard.classList.add("unmatched");
    secondCard.classList.add("unmatched");

    setTimeout(() => {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        firstCard.classList.remove("unmatched");
        secondCard.classList.remove("unmatched");
         resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard , secondCard] = [null, null];
}

(function suffle() {
    cardWraps.forEach((cardWraps) => {
        let randomPos = Math.floor(Math.random() * 12);
        cardWraps.style.order = randomPos;
    });
})();

setTimeout(() => {
    cards.forEach(card => {
        card.classList.add("open");  
    });
}, 100);

setTimeout(() => {
    cards.forEach(card => {
        card.classList.remove("open");
    });
}, 4000);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});





