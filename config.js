export const gameConfig = {
  numberRabbitsStart: 3,
  numberRabbitsGame: 2,
  speed: 200,
  duration: 30
}

export const gameElements = {
  bunnyspace: document.getElementById("bunnyspace"),
  lives: document.querySelectorAll("#lives img"),
  countdown: document.getElementById("countdown"),
  countedClicksDiv: document.getElementById("counter"),
  countedClicksDisplay: document.getElementById("clicks1"),
  start: document.getElementById("start"),
  end: document.getElementById("end"),
  resultDisplay: document.getElementById("clicks2"),
  highscoreDisplay: document.getElementById("highscore-points"),
  again: document.getElementById("again")
}

