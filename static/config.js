export const gameConfig = {
  numberRabbitsStart: 3,
  numberRabbitsGame: 2,
  speed: 20,
  duration: 2
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
  countryHighscoreDisplay: document.getElementById("country-points"),
  countryDisplay: document.getElementById("country-name"),
  again: document.getElementById("again")
}

