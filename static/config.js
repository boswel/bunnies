export const gameConfig = {
  numberRabbitsStart: 3,
  numberRabbitsGame: 2,
  speed: 200,
  duration: 10
}

export const gameElements = {
  bunnyspace: document.getElementById("bunnyspace"),
  lives: document.querySelectorAll("#lives img"),
  countdown: document.getElementById("countdown"),
  countedClicksDiv: document.getElementById("counter"),
  countedClicksDisplay: document.getElementById("clicks1"),
  countryTable: document.getElementById("country-table"),
  countries: document.getElementById("countries"),
  ownCountry: document.getElementById("own-country"),
  start: document.getElementById("start"),
  end: document.getElementById("end"),
  resultDisplay: document.getElementById("clicks2"),
  highscoreDisplay: document.getElementById("highscore-points"),
  personalCarrots: document.getElementById("personal-carrots"),
  countryCarrots: document.getElementById("country-carrots"),
  again: document.getElementById("again")
}

